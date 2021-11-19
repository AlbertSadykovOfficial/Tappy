<template>
    <div id="area">
      <h1>Tappy 
          <span v-if="alert">🚨</span>
          <span v-else>⌨</span>
      </h1>
      
      <textarea 
          @keydown="check"
          v-model="inputValue"
          class="area__textarea-front" 
          cols="60"
          rows="15">
      </textarea>
      <textarea 
          :value="answer" 
          class="area__textarea-back" 
          cols="60" 
          rows="15">
      </textarea>
      
      <app-speed :count="symbolCount"></app-speed>
      <app-mistakes :count="mistakesRate"></app-mistakes>
      <button @click="setAnswer">Next One ➡</button>

      <transition name="component-fade" mode="out-in">
        <div v-show="alert" class="area__alertBackground"></div>
      </transition>
    </div>
</template>

<script>
import Speed from "./components/Speed"
import Mistakes from "./components/Mistakes"

/*
*   Я решил не устанавлить Vuex, не устанвливать специальные библиотеки, 
*   чтобы можно было использовать async, потому что проект давольно простой. 
*   
*   Поэтому я выбрал подключить библиотеку axios через inline. 
*   В реальном бы проекте работал через Vuex -> actions.
*/
export default {

    data () {
        return {
            inputValue: '',
            answer: '',
            mistakes: 0,
            alert: false
        }
    },
    
    beforeMount () {
        this.setAnswer()
    },

    components: {
        'app-speed': Speed,
        'app-mistakes': Mistakes
    },

    methods: {
      check (event) {
          if (!["CapsLock", "Backspace"].includes(event.key)) {
              if (this.answer[(this.inputValue).length] !== event.key) {
                  this.mistakes++;
                  this.alert = true;
                  setTimeout(() => this.alert=false, 300);
                  event.preventDefault();
                  return false
              }
          } else {
              event.preventDefault();
              return false
          }
      },

      setAnswer () {
          axios.get('https://baconipsum.com/api/?type=all-meat&sentences=10')
          .then(
              (response) => {
                  this.inputValue = ''
                  this.answer = response.data[0]
          })
      }
    },

    computed: {
        symbolCount () {
            return this.inputValue.length
        },
        mistakesRate () {
            return this.mistakes / (this.inputValue.length + this.mistakes)
        }
    }
}
</script>

<style src="./assets/style.css" scoped></style>