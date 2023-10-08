<template>
  <div class="app-container">
    <div class="middle-section">
      <clickframe  class="center-pane" @click="incrementMoney"/>
      <div class="right-pane">
        <br>
        <div class="scrollable-container">
          <div>
            <ul class="list-group" style="padding: 5px">
              <li class="clist-group-item">
                <p style="color: black">💰 Money: {{ money }}</p>
              </li>
              <li class="clist-group-item">
                <p style="color:black;">click upgrade (+{{ clickValue }}): <button @click="buyClickUpgrade">{{ clickUpgradeCost }}</button></p>
              </li>
              <li class="clist-group-item">
                <p style="color:black;">AutoClick ({{autoClickerInterval}}ms): <button @click="buyAutoClickerUpgrade">{{autoClickerUpgradeCost}}</button></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-section">
      <div class="left-bottom-pane">ToDo</div>
      <div class="right-bottom-pane">ToDo</div>
    </div>
  </div>
</template>

<script>
import Clickframe from "@/components/Clickframe.vue";

export default {
  name: 'CircusClicker',
  components: {Clickframe},
  data() {
    return {
      money: 0,
      clickValue: 1,
      clickUpgradeCost: 10,
      autoClickerInterval: 1010,
      autoClicker:null,
      autoClickerUpgradeCost:50,
    };
  },
  methods: {
    incrementMoney() {
      this.money += this.clickValue;
    },
    buyClickUpgrade() {
      if (this.money >= this.clickUpgradeCost) {
        this.money -= this.clickUpgradeCost;
        this.clickValue *= 2;
        this.clickUpgradeCost *= 3;
      }
    },
    buyAutoClickerUpgrade() {
      if (this.money >= this.autoClickerUpgradeCost) {
        this.money -= this.autoClickerUpgradeCost;
        this.autoClickerInterval -= 10;
        clearInterval(this.autoClicker);
        this.autoClicker = setInterval(() => {
          this.incrementMoney();
        }, this.autoClickerInterval);
        this.autoClickerUpgradeCost *= 3;
      }
    },
  },
  beforeUnmount() {
    if (this.autoClickerInterval) {
      clearInterval(this.autoClickerInterval);
    }
  },
};

</script>

<style scoped>
.clist-group-item {
  position: relative;
  display: block;
  text-decoration: none;
}
.scrollable-container {
  overflow-y: auto;
  white-space: nowrap; /* Prevent button text from wrapping */
  height: inherit;
  width: min-content;
}

div {
  font-size: 3vw;
  text-align: center;
}
@media screen and (min-width: 530px) {
  div {
    font-size: 15px;
    text-align: center;
  }
}

.app-container {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 100vw;
  margin-top: 25vw;
}
@media screen and (min-width: 680px) {
  .app-container {
    font-family: 'Arial', sans-serif;
    display: flex;
    flex-direction: column;
    height: 90vh;
    width: 90vw;
    margin-top: 10vw;
  }
}
.middle-section {
  display: flex;
  height: 50%;
  background-color: #f9f9f9;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

 .center-pane {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  transition: background-color 0.3s;
}

.right-pane{
  display: flex;
  width: min-content;
}

.center-pane {
  flex-direction: column;
}



.bottom-section {
  display: flex;
  height: 40%;
}

.right-bottom-pane ,.left-bottom-pane{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e6e6e6;
  transition: background-color 0.3s;
}

.left-bottom-pane:hover, .right-bottom-pane:hover {
  background-color: #cccccc;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff8c00;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #ff4500;
}
</style>
