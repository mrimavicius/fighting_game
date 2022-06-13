"use strict";
const attackButton = document.querySelector(".attackButton");
const hpBar = document.querySelectorAll(".hpBar");
const hp = document.querySelectorAll(".hp");
const gold = document.querySelector(".gold");
const hpPotion = document.querySelector(".hpPotion");
const monsterImg = document.querySelector(".monster");
const playerWeapons = document.querySelectorAll(".weapons > img");
let monstersArray = ['https://images.unsplash.com/photo-1572453020814-972b244074d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9uc3RlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60', 'https://images.unsplash.com/photo-1619785699068-c8225c74ae46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG1vbnN0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60', 'https://images.unsplash.com/photo-1646455723568-af47f23536ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fG1vbnN0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60', 'https://images.unsplash.com/photo-1563067601-bce458d55850?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fG1vbnN0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60', 'https://images.unsplash.com/photo-1588422333078-44ad73367bcb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fG1vbnN0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60', 'https://images.unsplash.com/photo-1604684198625-f2a5e05cf2a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fG1vbnN0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60', 'https://images.unsplash.com/photo-1632889068719-53b1cbe39ab9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fG1vbnN0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60'];
const weapons = [
    {
        name: "sword",
        image: "https://thumbs.dreamstime.com/b/pixel-video-game-sword-icon-cartoon-retro-style-set-107893340.jpg",
        effect: "30% chance to dodge enemy attack",
        maxDamage: 12
    },
    {
        name: "bow",
        image: "https://images.cdn4.stockunlimited.net/preview1300/pixel-art-gaming-bow_2022318.jpg",
        effect: "25% chance to do double damage on attack",
        maxDamage: 8
    },
    {
        name: "wand",
        image: "http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/8211161278cf6d2.png",
        effect: "40% chance to heal yourself by 10 hit points on attack",
        maxDamage: 9
    }
];
let playerHealth = 100;
let monsterHealth = 100;
let playerGold = 0;
let hpPotionPrice = 50;
monsterImg.src = monstersArray[0];
let currentWeapon = "sword";
const monsterKilled = () => {
    if (monsterHealth === 0) {
        const RandomMonsterIndex = getRandomNumber(monstersArray.length - 1);
        monsterImg.src = monstersArray[RandomMonsterIndex];
        monsterHealth = 100;
    }
};
attackButton.onclick = () => {
    const weaponSelected = weapons.find(x => x.name === currentWeapon);
    // @ts-ignore
    const playerAttack = getRandomNumber(weaponSelected.maxDamage);
    const monsterAttack = getRandomNumber(10);
    playerGold += getRandomNumber(10);
    playerHealth -= monsterAttack;
    monsterHealth -= playerAttack;
    if (getRandomNumber(100) < 30 && currentWeapon === "sword") {
        console.log("attack dodged");
        playerHealth += monsterAttack;
    }
    if (getRandomNumber(100) < 25 && currentWeapon === "bow") {
        console.log("double attack");
        monsterHealth -= playerAttack;
    }
    if (getRandomNumber(100) < 40 && currentWeapon === "wand") {
        console.log("healed");
        playerHealth += 10;
    }
    updateHtml();
    monsterKilled();
};
const getRandomNumber = (num) => {
    return Math.round(Math.random() * num);
};
hpPotion.onclick = () => {
    if (playerGold >= 50) {
        playerHealth = 100;
        playerGold -= hpPotionPrice;
        updateHtml();
    }
    else
        return;
};
function updateHtml() {
    if (playerHealth < 0)
        playerHealth = 0;
    if (monsterHealth < 0)
        monsterHealth = 0;
    hpBar[0].style.width = `${playerHealth}%`;
    hpBar[1].style.width = `${monsterHealth}%`;
    hp[0].innerHTML = `
    Health: ${playerHealth}
    `;
    gold.innerHTML = `
    Gold: ${playerGold}
    `;
    hp[1].innerHTML = `
    Health: ${monsterHealth}
    `;
}
playerWeapons.forEach(x => x.onclick = (e) => {
    // @ts-ignore
    const weaponClicked = e.target.id;
    currentWeapon = weaponClicked;
    playerWeapons.forEach(x => x.classList.remove("selected"));
    // @ts-ignore
    e.target.classList.add("selected");
});
