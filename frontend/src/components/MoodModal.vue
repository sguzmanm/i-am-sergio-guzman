<template>
    <div class="modal">
      <div class="modal__backdrop" @click="hideModal"/>
      <div class="modal__wrapper">
        <div class="modal__content">
            <div class="modal__close">
                <button @click="hideModal">&times;</button>
            </div>
            <div class="modal__header">
                Change my mood
            </div>
            <div class="modal__body">
                <div class="mood" v-for="(mood,index) in filteredMoods" :key="index">
                    <div>
                        <i :class="mood.faIcon"></i>
                        <p>{{mood.title}}</p>
                    </div>
                    <button @click="setCurrentMood(mood)"> Set mood </button>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import useMoods from '@/compositions/useMoods';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

export default {
  name: 'MoodModal',
  setup(props, { root }) {
    const { currentMood, moods } = useMoods(root);
    const { useActions } = createNamespacedHelpers(
      root.$store,
      'moods',
    );

    const { setCurrentMood } = useActions(['setCurrentMood']);

    const filteredMoods = [];
    moods.value.forEach((mood) => {
      if (!filteredMoods.find((el) => el.title === mood.title)) {
        filteredMoods.push(mood);
      }
    });

    return { currentMood, filteredMoods, setCurrentMood };
  },
  props: {
    hideModal: Function,
  },
};
</script>

<style>
.modal{
  z-index:2;

  top:0;
  left:0;
  position:fixed;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__backdrop{
  z-index:1;
  background-color:black;
  opacity:0.6;

  width:100vw;
  height:100vh;
  display:flex;
  align-items: center;
  justify-content: center;
}

.modal__wrapper{
  display:flex;
  position:absolute;
  z-index:2;

  justify-content: center;
  align-items: center;
}

.modal__content{
  max-width: 100%;

  background-color:var(--text-color);
}

.modal__header{
  font-size:30px;
  font-weight: bold;
  text-align: center;
  padding: 30px;

  margin:0;
  color:var(--background-color);
}

.modal__close {
  width:100%;
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
}

.modal__close button{
  background: none;
  border:none;

  font-size:30px;
  color:var(--background-color);

  cursor:pointer;
}

.modal__body{
  background-color: var(--background-color);
  color:var(--text-color);
  margin:0;

  overflow-y:scroll;
  max-height:50vh;
}

.modal__body::-webkit-scrollbar {
  width: 1em;
}
 
.modal__body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px var(--text-color);
}
 
.modal__body::-webkit-scrollbar-thumb {
  background-color: var(--highlight-color);
  outline: 1px solid var(--background-color);
}


.mood{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding:15px 30px;
}

.mood > div{
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  font-size:30px;
  margin: 0 20px;
}

.mood i{
  margin: 0 20px;
}

.mood > button{
  color: var(--background-color);
  background: var(--highlight-color-2);
  border:none;
  cursor:pointer;

  padding: 5px 20px;
  font-size: 20px;
  border-radius: 15px;
}

.mood > button:hover{
  background: var(--highlight-color);
}

@media (max-width: 700px) {
  .modal__content{
    max-width: 100%;
  }

  .mood{
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding:15px 30px;
  }
}

</style>
