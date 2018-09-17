const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Prefab_Game extends cc.Component {
    @property({
        tooltip: "主角的x最大移动速度"
    })
    maxMoveSpeedx: number = 0;

    @property({
        tooltip: "主角的y最大移动速度"
    })
    maxMoveSpeedy: number = 0;

    @property({
        tooltip: "主角的y轴加速度",
    })
    accely: number = 0;

    @property({
        tooltip:"主角的x轴加速度",
    })
    accelx: number = 0;

    onLoad() {
        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        this.accDown = false;
        this.accUp = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;
        this.ySpeed = 0;
        //键盘监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
    }

    update(dt){
        if (this.accLeft) {
            this.xSpeed -= this.accelx * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accelx * dt;
        }

        if(this.accUp){
            this.ySpeed +=this.accely * dt;
        }else if(this.accDown){
            this.ySpeed -= this.accely * dt;
        }
        // 限制主角的速度不能超过最大值
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeedx ) {
            this.xSpeed = this.maxMoveSpeedx * this.xSpeed / Math.abs(this.xSpeed);
        }

        if(Math.abs(this.ySpeed) > this.maxMoveSpeedy){
            this.ySpeed = this.maxMoveSpeedy * this.ySpeed / Math.abs(this.ySpeed);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;
    }

    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
    }

    private onKeyDown(event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.KEY.a || cc.KEY.dpadLeft:
                this.accLeft = true;
                break;
            case cc.KEY.d || cc.KEY.dpadRight:
                this.accRight = true;
                break;
            case cc.KEY.w || cc.KEY.dpadUp:
                this.accUp = true;
                break;
            case cc.KEY.s || cc.KEY.dpadDown:
                this.accDown = true;
                break;
        }
    }

    private onKeyUp(event) {
        // unset a flag when key released
        switch (event.keyCode) {
            case cc.KEY.a:
                this.accLeft = false;
                break;
            case cc.KEY.d:
                this.accRight = false;
                break;
            case cc.KEY.w || cc.KEY.dpadUp:
                this.accUp = false;
                break;
            case cc.KEY.s || cc.KEY.dpadDown:
                this.accDown = false;
                break;
        }
    }

    private accRight: boolean;
    private accLeft: boolean;
    private accUp: boolean;
    private accDown: boolean;
    private xSpeed: number;
    private ySpeed: number;
}