//create playingfield

/*
  ___      _             
 / __| ___| |_ _  _ _ __ 
 \__ \/ -_)  _| || | '_ \
 |___/\___|\__|\_,_| .__/
                   |_|   
*/

// Setup Vars & Player Elements
var playerHealth = $('#playerHealth'),
    attackBTN = $('#personAttack'),
    damage;

/*
   ___             _               _              
  / __|___ _ _  __| |_ _ _ _  _ __| |_ ___ _ _ ___
 | (__/ _ \ ' \(_-<  _| '_| || / _|  _/ _ \ '_(_-<
  \___\___/_||_/__/\__|_|  \_,_\__|\__\___/_| /__/
*/

// Player Constructor
var Player = function (options) {
  var options = options || {};
  this.name = options.name;
  this.health = 100;
  this.attack = function (target) {
    process_attack(this, target);
  };
  this.elem = options.elem;
};


// Monster Constructor
var Monster = function (options) {
  var options = options || {};
  this.name = options.name;
  this.health = 100;
  this.elem = options.elem;
};

/*
  ___         _                       
 |_ _|_ _  __| |_ __ _ _ _  __ ___ ___
  | || ' \(_-<  _/ _` | ' \/ _/ -_|_-<
 |___|_||_/__/\__\__,_|_||_\__\___/__/
*/

// Player Instance
var ryu = new Player ({ 
  name: 'Ryu',
  elem: $('.player')
});

// Monster Instances
var rickRoss = new Monster ({
  name: 'Rick Ross',
  elem: $('.opponent')
});


/*
    _      _   _             
   /_\  __| |_(_)___ _ _  ___
  / _ \/ _|  _| / _ \ ' \(_-<
 /_/ \_\__|\__|_\___/_||_/__/
                             
*/


// Player Attack Action
attackBTN.on('click', function () {
  ryu.attack(rickRoss);
});


// Function to attack a Monster
// This function should be broken down a little bit more, but you get the point.
var process_attack = function (attacker, attackee) {

  // Reset our Attack Button
  attackBTN.prop('disabled', false).text('Attack');

  // Generate a new damage value each time
  damage = _.random(5, 20);

  // Lower the attackee's health
  attackee.health -= damage;

  // If Attackee is still alive, decrease health!
  if (attackee.health > 0) {

    // Update the individual attacked's health visually
    attackee.elem.find('input').val(attackee.health);
  
    // When we attack a monster, he fights back
    if (attackee instanceof Monster) {
      console.log('You were attacked back');
      attackBTN.prop('disabled', true).text('Defending...');
      _.delay(process_attack, 1000, attackee, attacker);
    }

  } else {

    if (attackee instanceof Player) {
      // You Loose!!
      $('body').empty().css('background', 'url(http://goo.gl/0fmNnb)');
    } else {
      // You Win!!
      $('body').empty().css('background', 'url(http://goo.gl/zeyWpy)');
    }

  }
};