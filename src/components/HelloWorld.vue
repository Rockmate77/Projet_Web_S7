<template>
  <div class="app-container">
    <div class="top-bar">Barre de menu</div>
    <div class="middle-section">
      <div class="left-pane">
        💰 Thunes: {{ thunes }}
      </div>
      <div class="center-pane">
        Animation de cirque
        <div class="click-zone" @click="incrementThunes">🎪 Zone de cliques (+{{ clickValue }})</div>
      </div>
      <div class="right-pane">
        <div id="rocketUpgrade">Upgrade des upgrades 🚀 (Coût: {{ upgradeCost }} Thunes)</div>
        <button @click="buyUpgrade">Acheter</button>
        <div id="autoClickerIcon">Auto-Cliqueur 🤖 (Coût: 50 Thunes)</div>
        <button @click="buyAutoClicker">Acheter</button>
      </div>
    </div>
    <div class="bottom-section">
      <div class="left-bottom-pane">Notifs/Achievement</div>
      <div class="right-bottom-pane">Upgrades</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircusClicker',
  data() {
    return {
      thunes: 0,
      clickValue: 1,
      upgradeCost: 10,
      autoClickerInterval: null,
    };
  },
  methods: {
    incrementThunes() {
      this.thunes += this.clickValue;
    },
    buyUpgrade() {
  if (this.thunes >= this.upgradeCost) {
    this.thunes -= this.upgradeCost;
    this.clickValue *= 2;
    this.upgradeCost *= 1.5;
    this.triggerAnimation("rocketUpgrade");
  }
},
buyAutoClicker() {
  if (this.thunes >= 50 && !this.autoClickerInterval) {
    this.thunes -= 50;
    this.autoClickerInterval = setInterval(() => {
      this.incrementThunes();
    }, 1000);
    this.triggerAnimation("autoClickerIcon");
  }
},
triggerAnimation(elementId) {
  let element = document.getElementById(elementId);
  element.classList.add("pulse");
  setTimeout(() => {
      element.classList.remove("pulse");
  }, 200);
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

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

.pulse {
    animation: pulse 0.2s;
}



.app-container {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top-bar {
  height: 10%;
  background-color: #ff8c00;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.middle-section {
  display: flex;
  height: 50%;
  background-color: #f9f9f9;
  border: 2px solid black;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.left-pane, .right-pane, .center-pane {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  background-color: #e6e6e6;
  transition: background-color 0.3s;
}

.left-pane:hover, .right-pane:hover, .center-pane:hover {
  background-color: #cccccc;
}

.center-pane {
  flex-direction: column;
}

.click-zone {
  margin-top: 20px;
  padding: 10px;
  border: 2px solid #ff4500;
  background-color: #ff7043;
  border-radius: 5px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.click-zone:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px #ff4500;
}

.bottom-section {
  display: flex;
  height: 40%;
  border: 2px solid black;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.left-bottom-pane, .right-bottom-pane {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
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
