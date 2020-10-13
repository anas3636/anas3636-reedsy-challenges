<template>
  <div class="home">
    <h1>Top books of all time</h1>
    <div class="search">
      <input type="text" name="search" placeholder="Search Book" v-model="search">
    </div>
    <BookItem v-for="book in books" :key="book.slug" 
              class="bookItem"
              :book="book" />
    <div class="pagination">
      <ul>
        <li @click="previousPage">
          <a>&laquo;</a>
        </li>
        <li>
          <a>{{page}}</a>
        </li>
        <li @click="nextPage">
          <a>&raquo;</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch  } from 'vue-property-decorator'
import BookItem from '@/components/BookItem.vue'
import bookInterface from '@/api/books/bookInterface'
import BooksService from "@/api/books/books";

@Component({
  components: {
    BookItem
  }
})
export default class Home extends Vue {
    public books: Array<bookInterface> = [];
    private page: number = 1;
    private itemsPerPage: number = 3;
    private total:number = 0;
    private search: String = '';

    created() {
      this.getBooks();
    };
    @Watch('search')
    searchChanged(newVal: string) {
      this.page = 1;
      this.getBooks();
    }
    public getBooks(): void {
        BooksService.getAll(this.itemsPerPage, this.page -1, this.search)
        .then((data) => {
          console.log(data.data)
          this.books = data.data.books;
          this.total = Math.ceil(parseInt(data.data.meta.count) / this.itemsPerPage);
        })
    };
    public previousPage(): void {
      if(this.page >1){
        this.page -= 1;
        this.getBooks();
      }
    };
    public nextPage(): void {
      if(this.page < this.total){
        this.page += 1;
        this.getBooks();
      }
    }
}
</script>
<style lang="scss" scoped>
.home {
  padding-top: 1rem;
  h1 {
    text-align: center;
    font-weight: bold;
    color: #ddaa43;
    margin-top: 0rem;
  }
  .search {
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    input {
      margin: auto;
      width: 30%;
      padding: 5px;
    }
  }
  .book:nth-child(odd) {
    background-color: white;
  }
  .pagination {
    display: flex;
    align-items: center;
    padding: 0.5rem!important;
    ul {
      list-style: none;
      margin: auto;
      li {
          display: inline-block;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 6px;
          
      }
      li:hover {
          color: rgb(207, 204, 204);
          transition: all 0.3s ease 0s;
      }
    }
  }
}
</style>
