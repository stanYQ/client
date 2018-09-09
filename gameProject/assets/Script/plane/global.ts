var Global = {
	// 子弹移动速度
	bulletSpeed:10,
	// 敌机移动速度
	enemySpeed:function(type){
		switch(type){
			case 1:
				return 5;
			case 2:
				return 3;
			case 3:
				return 2;
		};
	},
	// 敌机创造速度
	createEnemySpeed:function(type){
		switch(type){
			case 1:
				return 1;
			case 2:
				return 3;
			case 3:
				return 5;
		};
	},
	// 敌机生命
	enemyHp:function(type){
		switch(type){
			case 1:
				return 1;
			case 2:
				return 5;
			case 3:
				return 10;
		};
	},
	// 道具移动速度
	toolSpeed:function(type){
		switch(type){
			case 1:
				return 2;
			case 2:
				return 3;
		};
	},
	// 道具创造速度
	createToolSpeed:function(type){
		switch(type){
			case 1:
				return 30;
			case 2:
				return 50;
		};
	},
	// 射击速度
	shootSpeed:0.2,
	// 双倍射击时长
	doubleShootTimes:100
};