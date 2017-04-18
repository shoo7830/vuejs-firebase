<!--suppress ALL -->
<template>
  <div id="app" class="">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Vue.js/Firebase 책 관리 웹앱
          </h1>
          <h2 class="subtitle">
            당신의 책을 관리하세요
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-4">
            <div class="box">
              <form id="form" class="form-inline" v-on:submit.prevent="addBook">
                <label for="bookTitle" class="label">책 제목</label>
                <p class="control"><input type="text" id="bookTitle" class="input" v-model="newBook.title" placeholder="제목을 입력하세요"></p>

                <label for="bookAuthor" class="label">저자</label>
                <p class="control"><input type="text" id="bookAuthor" class="input" v-model="newBook.author" placeholder="저자를 입력하세요"></p>

                <label for="bookUrl" class="label">링크</label>
                <p class="control"><input type="text" id="bookUrl" class="input" v-model="newBook.url"></p>

                <input type="submit" class="button is-primary is-medium is-fullwidth" value="책 추가">

              </form>
            </div>
          </div>
          <div class="column">
            <div class="">
              <table class="table is-bordered">
                <thead>
                <tr>
                  <th>제목</th>
                  <th>저자</th>
                  <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="book in books">
                  <td><a v-bind:href="book.url" target="_blank">{{book.title}}</a></td>
                  <td>{{book.author}}</td>
                  <td><span class="icon"><span class="fa fa-remove" aria-hidden="true" v-on:click="removeBook(book)"></span></span></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>

</template>

<script scope>
import Firebase from 'firebase'


let config = {
    apiKey: "AIzaSyBlRiT7iAFhbmJgOCcKL1MoZwssjHB5RXk",
    authDomain: "vuejs-app-676ec.firebaseapp.com",
    databaseURL: "https://vuejs-app-676ec.firebaseio.com",
    storageBucket: "vuejs-app-676ec.appspot.com",
    messagingSenderId: "380341024291" // 초기화 코드
}

let app = Firebase.initializeApp(config) // Firebase 초기화
let db = app.database() // 실시간 데이터베이스 사용 준비 완료
let booksRef = db.ref('books') // 데이터베이스 참조 검색


export default {
    name: 'app',
    firebase: function() {
        return {
            books: booksRef
        }
    }, // Vuefire 라이브러리로 Vue.js속성 바인딩

    data () {
        return {
            newBook: {
                title: '',
                author: '',
                url: 'http://'
            }
        }
    }, // 데이터 모델 정의

    computed: {
        validation: function () {
            return {
                title: !!this.newBook.title.trim(),
                author: !!this.newBook.author.trim()
                // url:
            }
        },
        isValid: function () {
            var validation = this.validation
            return Object.keys(validation).every(function (key) {
                return validation[key]
            })
        }
    },

    methods: {
        addBook: function () {
            if (this.isValid) {
                booksRef.push(this.newBook);
                this.newBook.title = '';
                this.newBook.author = '';
                this.newBook.url = 'http://';
                this.$notify.success({content: '책이 잘 등록되었습니다.'});
            } else {
                this.$notify.warning({content: '빈 칸을 채워주세요.'});
            }
        },
        removeBook: function (book) {
            booksRef.child(book['.key']).remove();
            this.$notify.info({content: '책이 잘 삭제되었습니다.'});

        }
    }
}
</script>

<style scope>
  .control:not(:last-child) {
    margin-bottom: 10px;
  }

</style>
