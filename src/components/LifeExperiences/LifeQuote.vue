<template>
  <div class="life-quote">
      <div class="life-quote__image">
        <img :src="quote.image" :alt="`Image for ${quote.category} experience`"/>
        <p>{{quote.category}}</p>
      </div>
      <div class="life-quote__quote">
          <p>
            {{quote.quote}}
            <a v-if="quote.link" :href="quote.link.url" target="__blank">
              {{quote.link.name?quote.link.name:quote.link.url}}
            </a>
          </p>
          <div class="life-quote__arrows">
              <button @click="getPreviousQuote">&lt;</button>
              <button @click="getNextQuote">&gt;</button>
          </div>
      </div>
   </div>
</template>

<script>
export default {
  name: 'LifeQuote',
  props: {
    quote: Object,
    getPreviousQuote: Function,
    getNextQuote: Function,
  },
};
</script>

<style>

 .life-quote{
     background-color: var(--background-color);
     border: solid 1px var(--text-color);
     border-radius:5px;

     padding: 10px;
     margin: 15px 0;
     display:flex;
 }

 .life-quote__image{
  flex:1;
  border-radius: 50%;
  border-collapse: separate;
  margin:5px 20px;

  display:flex;
  flex-direction: column;
  align-items: center;
 }

 .life-quote__image img,.life-quote__image p{
  width:100%;
  margin:0;
 }

 .life-quote__image p{
    background-color: var(--highlight-color);
    color:var(--text-color);
    padding:10px;
    font-weight:bold;
 }

 .life-quote__quote{
  flex:4;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-size: 20px;
 }

 .life-quote__quote a,.life-quote__quote a:visited {
  color: var(--highlight-color);
  font-weight: bold;
 }

 .life-quote__quote a:hover {
  color: var(--highlight-color-2);
 }

 .life-quote__arrows button{
  margin: 20px;

  color:var(--text-color);
  font-size: 40px;
  font-weight: bold;

  background: none;
  border:none;
  cursor:pointer;
 }

</style>
