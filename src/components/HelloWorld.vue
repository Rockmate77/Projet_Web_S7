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
      <div class="left-bottom-pane">
        <div v-if="gameOver">Perdu ! Vous n'avez pas atteint le niveau {{ currentLevel }} à temps.</div>
        <div v-else-if="nextLevel">
          Félicitations ! Niveau {{ currentLevel }} atteint !
          <div>Prochain niveau : {{ currentLevel + 1 }}</div>
        </div>
        <div v-else>Temps restant : {{ timeLeft }} secondes</div>
        <div>Progression : {{ thunes }} / {{ goalForCurrentLevel() }}</div>
        <!-- Barre de progression -->
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: progressBarWidth + '%' }"></div>
        </div>
      </div>
      <div class="right-bottom-pane"><div>Niveau actuel : {{ currentLevel }}</div>
  </div>
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
      timeLeft: 30,
      currentLevel: 1,
      nextLevel: false,
      gameOver: false,
      levels: [
        { level: 1, goal: 100 },
        { level: 2, goal: 200 },
        { level: 3, goal: 400, time: 60 },
        { level: 4, goal: 600, time: 80 },
        { level: 5, goal: 1500, time: 100 },
      ],
      levelTimeInterval: null,
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
    goalForCurrentLevel() {
      const levelInfo = this.levels.find(lvl => lvl.level === this.currentLevel);
      return levelInfo ? levelInfo.goal : Infinity;
    },
    startLevelTimer() {
    if (this.levelTimeInterval) {
      clearInterval(this.levelTimeInterval);
    }
    if(this.currentLevel === 1){
      this.timeLeft = 15;
    } else if(this.currentLevel === 2){
      this.clickValue = 1;
      this.thunes = 0;
      this.timeLeft = 20;
    } else if(this.currentLevel === 3){
      this.clickValue = 1;
      this.thunes = 0;
      this.timeLeft = 30;
    } else if(this.currentLevel === 4){
      this.clickValue = 1;
      this.thunes = 0;
      this.timeLeft = 40;
    } else if(this.currentLevel === 5){
      this.clickValue = 1;
      this.thunes = 0;
      this.timeLeft = 60;
    }
    //this.timeLeft = 30; // Vous pouvez ajuster le temps par niveau si vous le souhaitez
    this.levelTimeInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.levelTimeInterval);
        
        if (this.thunes >= this.goalForCurrentLevel()) {
          // ... logique pour passer au niveau suivant ...
        } else {
          this.gameOver = true; // Indicateur de fin de partie

          // Nouveau: Définir un délai avant de réinitialiser le jeu.
          setTimeout(() => {
            // La réinitialisation du jeu après un court délai permet au joueur de voir le message de fin de partie.
            this.resetGame(); // Cette méthode réinitialisera et redémarrera le jeu.
          }, 2000); // Attendre 2 secondes avant de réinitialiser.
        }
      }
    }, 1000);
  },



  checkLevelCompletion() {
    const currentLevelInfo = this.levels.find(lvl => lvl.level === this.currentLevel);

    if (this.thunes >= currentLevelInfo.goal) {
      // Si le joueur atteint l'objectif, passez au niveau suivant.
      this.advanceToNextLevel();
    } else if (this.timeLeft === 0) {
      // Si le temps est écoulé et que l'objectif n'est pas atteint, le jeu est terminé.
      this.gameOver = true;
      // Attendre un moment pour afficher le message de fin de partie, puis réinitialiser le jeu.
      setTimeout(() => {
        this.resetGame();
      }, 2000); // Attendre 2 secondes avant de réinitialiser.
    }
  },

  advanceToNextLevel() {
    const nextLevelIndex = this.levels.findIndex(lvl => lvl.level === this.currentLevel) + 1;

    if (nextLevelIndex < this.levels.length) {
      // Si il y a encore des niveaux à avancer, définir le prochain niveau.
      this.currentLevel = this.levels[nextLevelIndex].level;
      this.startLevelTimer(this.levels[nextLevelIndex].time); // Démarrer le timer avec le nouveau temps.
    } else {
      // Si le joueur a terminé tous les niveaux, indiquez peut-être un état de victoire.
      this.gameOver = true;
      
    }
  },

  resetGame() {
    // Réinitialiser le jeu pour recommencer du premier niveau.
    this.thunes = 0;
    this.currentLevel = 1;
    this.gameOver = false;
    this.startLevelTimer(this.levels[0].time); // Redémarrer le timer du premier niveau.
  },
},

startLevelTimer(timeForThisLevel) {
    if (this.levelTimeInterval) {
      clearInterval(this.levelTimeInterval);
    }
    this.timeLeft = timeForThisLevel;
    this.levelTimeInterval = setInterval(() => {
    }, 1000);
  },

  watch: {
  thunes() {
    this.checkLevelCompletion();
  },
  timeLeft() {
    if (this.timeLeft === 0) {
      this.checkLevelCompletion();
    }
  },
},

created() {
  this.startLevelTimer(this.levels[0].time);
},


  beforeUnmount() {
    if (this.autoClickerInterval) {
      clearInterval(this.autoClickerInterval);
    }
    if (this.levelTimeInterval) {
      clearInterval(this.levelTimeInterval);
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

.progress-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  padding: 3px;
  box-sizing: border-box;
  border-radius: 3px;
  margin-top: 10px;
}
.progress-bar {
  height: 20px;
  background-color: #ff8c00;
  border-radius: 1px;
  transition: width 0.5s ease-in-out;
}
</style>
