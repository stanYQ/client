const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Prefab_Bullet extends cc.Component {
    @property({
        tooltip:"子弹的速度"
    })
    bulletSpeed: number = 0;

    @property({
        tooltip: "y轴加速度",
    })
    accely: number = 0;

    onLoad(){

    }

    update(dt){
       this.bulletSpeed += this.accely*dt; 
       this.node.y += this.bulletSpeed * dt; 
    }

    getBullet(){
        return this.node.getPosition();
    }
}