<template>
    <div class="book">
        <div class="content">
            <h3 @click="getBook">{{book.title}}</h3>
            <div class="author">{{book.author}}</div>
            <div class="synopsis">
                <p>{{displaySynopsis}}</p>
            </div>
            <div class="buttonArea">
                <button type="button" :class="book.upvoted ? 'upvoted' : 'notUpvoted'">Upvote</button>
                <div class="upvotes"><p>Upvoted {{book.upvotes}} times</p></div>
            </div>
        </div>
        <img @click="getBook" :src="book.cover">
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import bookInterface from '@/api/books/bookInterface'

@Component
export default class BookItem extends Vue {
    @Prop({type: Object as Vue.PropType<bookInterface>}) book!: bookInterface;
    private router: Object = {
        name: "Book",
        params: {
            slug: this.book.slug
        }
    };
    get displaySynopsis() {
        return this.book.synopsis.slice(0,200)+'...';
    }
    getBook() {
       this.$router.push(this.router);
    }
}
</script>

<style lang="scss" scoped>
.book {
    display: flex;
    flex-wrap: wrap;
    padding: 1.5rem!important;
    background-color: #fafaf3;
    .content {
        width: 70%;
        margin-right: 1.5rem!important;
        h3 {            
            font-weight: bold;
            color: #a97721;
            cursor: pointer;
        }
        .author {
            font-style: italic;;
            color: #595959;
            margin-bottom: 1rem!important;
            font-size: 16px;
        }
        .synopsis {
            font-size: 15px;
        }
        .buttonArea {
            display: flex;
            flex-wrap: wrap;
            margin-top: 2.5rem!important;
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
            }
            .notUpvoted {
                background-color: #ddaa43;
                color: white;
            }
            .upvotes {
                margin-left: 1.5rem!important;
                font-size: 15px;
                p {
                    position: relative;
                }
            }
        }
    }
    img {
        width: 25%;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        height: 250px;
        flex-grow: 1;
        cursor: pointer;
    }
}
</style>