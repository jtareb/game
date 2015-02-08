
  


// Setup Vars & Player Elements
var playerHealth = $('#playerHealth'),
    attackBTN = $('#playerAttack'),
    opponentHealth = $('#opponentHealth'),
    damage;


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


// Opponent Constructor
var Opponent = function (options) {
  var options = options || {};
  this.name = options.name;
  this.health = 100;
  this.elem = options.elem;

};



// Player Instance
var ali = new Player ({ 
  name: 'Ali',
  elem: $('.player')
});

// Monster Instances
var frazier = new Opponent ({
  name: 'Frasier',
  elem: $('.opponent')
});








// Player Attack Action
attackBTN.on('click', function () {
  ali.attack(frasier);
});



var process_attack = function (attacker, attackee) {

  console.log(attacker);

 
  attackBTN.prop('disabled', false).text('Attack');


  damage = _.random(5, 20);

  attackee.health -= damage;

  

  if (attackee.health > 0) { 
      attackee.elem.find('input').val(attackee.health);
  
    if (attackee instanceof Opponent) {
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
