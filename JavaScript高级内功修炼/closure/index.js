/**
 * yuanxin
 */

(function () {
	// 我是汪洋老师
	function prepare() {

		const imgTask = (img, src) => {
			return new Promise(function (resolve, reject) {
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};

		const context = document.getElementById('content').getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();

		const allresourceTask = Promise.all([
			imgTask(heroImg, './hero.png'),
			imgTask(allSpriteImg, './all.jpg'),
		]);

		return {
			/**
			 * @param {Function} [callback] - 当准备好了之后要调用的回掉函数
			 */
			getResource(callback) {
				allresourceTask.then(function () {
					callback && callback(context, heroImg, allSpriteImg);
				});
			}
		};
	}


	// 我是袁鑫老师
	function drawHero(context, heroImg, allSpriteImg) {

		var draw = function () {
			this.context
				.drawImage(
					this.img,
					this.imgPos.x,
					this.imgPos.y,
					this.imgPos.width,
					this.imgPos.height,
					this.rect.x,
					this.rect.y,
					this.rect.width,
					this.rect.height
				);
    }

    // 英雄类
    function Hero(initPos) {
      this.img = heroImg;
      this.context = context;
      this.heroWidth = this.img.width / 4; // 英雄所占身位的宽
      this.heroHeight = this.img.height / 4; // 英雄所占身位的高
      this.imgPos = {
        x: 0,
				y: 0,
				width: this.heroWidth,
				height: this.heroHeight
      };

      this.rect = {
        x: initPos.x,
        y: initPos.y,
        width: 32,
        height: 32
      };

      this.stepSzie = 32; // 每步移动的距离
      this.stepX = 0; // 键盘控制英雄移动步数 x方向
      this.stepY = 0; // 键盘控制英雄移动步数 y方向
      // 通过index控制图片行走切换，达到动画效果
      this.index = 0;
      document.onkeydown = (function(event){
        var e = event || window.event;
        switch (e.keyCode) {
          case 37: // 左
            this.direction = 1;
            this.stepX--;
            if(this.stepX * this.stepSzie + this.stepSzie <= 0) this.stepX++;
            this.moveDraw({x: this.stepX * this.stepSzie + this.stepSzie, y: this.stepY * this.stepSzie})
            break;
          case 38: // 上
            this.direction = 3;
            this.stepY--;
            if(this.stepY * this.stepSzie + this.stepSzie <= 0) this.stepY++;
            this.moveDraw({x: this.stepX * this.stepSzie, y: this.stepY * this.stepSzie + this.stepSzie})
            break;
          case 39: // 右
            this.direction = 2;
            this.stepX++;
            if(this.stepX * this.stepSzie - this.stepSzie > 450) this.stepX--;
            this.moveDraw({x: this.stepX * this.stepSzie - this.stepSzie, y: this.stepY * this.stepSzie})
            break;
          case 40: // 下
            this.direction = 0;
            this.stepY++;
            if(this.stepY * this.stepSzie + this.stepSzie > 300) this.stepY--;
            this.moveDraw({x: this.stepX * this.stepSzie, y: this.stepY * this.stepSzie - this.stepSzie})
            break;
          default:
            break;
        }
      }).bind(this); 
    }
    Hero.prototype.draw = draw;
    Hero.prototype.moveDraw = function(point) {
      this.index++;
      this.context.clearRect(point.x, point.y, this.heroWidth, this.heroHeight);
			this.context
				.drawImage(
					this.img,
					this.index * this.heroWidth,
					this.direction * this.heroHeight,
					this.heroWidth,
          this.heroHeight,
					this.stepX * this.stepSzie,
					this.stepY * this.stepSzie,
					this.heroWidth,
					this.heroHeight
				);
      if(this.index >= 3){
        this.index = 0;
      }
    }

    // 黑色魔方类
    function Monster(initPos) {
        this.img = allSpriteImg;
			  this.context = context;
        this.imgPos = {
          x: 858,
          y: 529,
          width: 32,
          height: 32
        };

        this.rect = {
          x: initPos.x,
          y: initPos.y,
          width: 28,
          height: 28
        };
    }
    Monster.prototype.draw = draw;

    // 红色魔王类
    function RedMonster(initPos) {
      Monster.call(this, initPos);
      this.imgPos = {
        x: 858,
        y: 497,
        width: 32,
        height: 32
      };
      this.rect = {
        x: initPos.x,
        y: initPos.y,
        width: 28,
        height: 28
      };
    }
    RedMonster.prototype = Object.create(Monster.prototype);

    // 绘制英雄
    var hero = new Hero({x: 0, y: 0});
    hero.draw();
    // 绘制怪兽
    var monster = new Monster({x: 100, y: 100});
    var monster2 = new RedMonster({x: 192, y: 192});
    monster.draw();
    monster2.draw();
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});
})();
