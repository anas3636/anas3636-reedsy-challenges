<template>
  <div class="book">
    <div class="header">
      <div class="col1">
        <h2>{{book.title}}</h2>
      </div>
      <div class="col2">
        <button type="button" :class="book.upvoted ? 'upvoted' : 'notUpvoted'">Upvote</button>
        <div class="upvotes"><p>Upvoted {{book.upvotes}} times</p></div>
      </div>
    </div>
    <div class="author">{{book.author}}</div>
    <img :src="book.cover">
    <h4>Synopsis</h4>
    <div class="synopsis">
      <p>{{book.synopsis}}</p>
      <p class="rating">Rating: {{book.rating}}/10</p>
    </div>
    <h4>Comments</h4>
    <div class="comments" v-for="(item, index) in comments" :key="index">
      <p><strong>{{item.userName}} : </strong>{{item.content}}</p>
    </div>
    <div class="commentInput">
      <label>Name:</label>
      <input type="text" name="CommentUser" label="Name" placeholder="enter your name" v-model="comment.userName">
      <label>Comment:</label>
      <textarea type="text" name="CommentContent" placeholder="enter your comment" v-model="comment.content"></textarea>
      <button type="button" class="upvoted" @click="addComment">Add</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import bookInterface from '@/api/books/bookInterface'
import BooksService from "@/api/books/books";
import commentInterface from '@/api/comments/commentInterface'
import CommentsService from "@/api/comments/comments"

@Component
export default class Book extends Vue {
  private book: bookInterface = {
    title: '',
    author: '',
    synopsis: '',
    rating: '',
    slug: '',
    cover: '',
    upvoted: false,
    upvotes: 0
  };
  private comment: commentInterface = {
    userName: '',
    content: ''
  }
  private comments: Array<commentInterface> = [];
  created() {
    this.getBook();
  };
  public getBook(): void {
    BooksService.getBook(this.$route.params.slug)
    .then((data) => {
      this.book = data.data;
      this.getComments();
    })
  }
  public getComments(): void {
    CommentsService.getComents(this.book.slug)
    .then((data) => {
      this.comments = data.data.comments;
    })
  }
  public addComment(): void {
    CommentsService.addComment(this.book.slug, this.comment)
    .then((data) => {
      this.comments = data.data.comments;
      this.comment = {
        userName: '',
        content: ''
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.book {
  display: flex;
  flex-direction: column;
  padding: 1.5rem!important;
  background-color: white;
  .header {
    display: flex;
    flex-wrap: wrap;
    .col1 {
      width: 50%;
      h2 {
        color: #ad7d2c;
        font-weight: bold;
      }
      
    }
    .col2 {
      width: 50%;
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: auto;
      button {
          border-color: #ddaa43;
          border-radius: 8px;
          border: solid;
          padding: 1px 10px;
          outline: none;
      }
      button:hover {
          background-color: #e6c688;
          transition: all 0.3s ease 0s;
      }
      .upvoted {
          background-color: white;
          color: #ddaa43;
          font-size: 15px;
      }
      .notUpvoted {
          background-color: #ddaa43;
          color: white;
      }
      .upvotes {
          margin-right: 1.5rem!important;
          p {
              position: relative;
              font-size: 15px;
          }
      }
        
    }
  }
  .author {
    font-style: italic;;
    color: #595959;
    margin-bottom: 1rem!important;
  }
  img {
    width: 35%;
    margin-right: auto;
    margin-left: auto;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
  h4 {
    font-weight: bold;
  }
  .synopsis {
    font-size: 15px;
    .rating {
      font-weight: bold;
    }
  }
  
  .comments {
    border: solid 10px;
    border-color: #ededd5;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    margin-bottom: 10px;
    padding-top: 5px;
    p {
      margin-left: 1.5rem!important;
      strong {
        color: #ad7d2c;
      }
    }
  }

  .commentInput {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1.5rem!important;
    border: solid 10px;
    border-color: #ededd5;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    label {
      margin-bottom: auto;
      margin-right: 10px;
    }
    input {
      margin-right: 1rem!important;
      margin-bottom: auto;
      padding-left: 0.5rem!important;
      width: 25%;
    }
    textArea {
      width: 40%;
      padding-left: 0.5rem!important;
    }
    button {
      background-color: #ddaa43;
      border-radius: 8px;
      border: solid;
      padding: 1px 10px;
      outline: none;
      margin-bottom: auto;
      margin-left: 1rem!important;;
    }
    button:hover {
          background-color: #e6c688;
          transition: all 0.3s ease 0s;
      }
  }
}
</style>
