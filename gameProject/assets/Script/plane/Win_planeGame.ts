import Prefab_Plaryer from "../cnm/Prefab_Plaryer";
import Prefab_Enemy from "../cnm/Prefab_Enemy";
import Prefab_Bullet from "../cnm/Prefab_Bullet";
import Win_GameOver from "./Win_GameOver";

const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Win_planeGame extends cc.Component {
    @property({
        type: cc.Node,
    })
    bg1: cc.Node = null;

    @property({
        type: cc.Node,
    })
    bg2: cc.Node = null;

    @property({
        type: cc.Label,
        tooltip: "玩家分数数值"
    })
    Score: cc.Label = null;

    @property({
        tooltip: "移动速度"
    })
    bgSpeed: number = 0.6;

    @property({
        type: cc.Prefab,
        tooltip: "子弹预设"
    })
    bulletPrefab: cc.Prefab = null;

    @property({
        type: cc.Node,
        tooltip: "玩家预设"
    })
    playerNode: cc.Node = null;

    @property({
        type: cc.Prefab,
        tooltip: "敌机1预设"
    })
    enemy1Prefab: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        tooltip: "敌机2预设"
    })
    enemy2Prefab: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        tooltip: "敌机3预设"
    })
    enemy3Prefab: cc.Prefab = null;

    @property({
        type: cc.Prefab,
        tooltip: ""
    })
    gameOver: cc.Prefab = null;

    onLoad() {
        this.scoreNow = 0;
        this.overActive = false;
        this.Score.string = this.scoreNow.toString();
        this.bgList[0] = this.bg1;
        this.bgList[1] = this.bg2;
        this.accFire = false;
        //键盘监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.spawnNewEnemy();
        this.updataActive();
    }

    update(dt) {
        this.bgMove(this.bgList, this.bgSpeed);
    }

    onDestroy() {
        this.clearNodePool();
    }

    getScore() {
        return this.scoreNow;
    }

    private updataActive() {
        const self = this;
        const updata = function () {
            const playerComp: Prefab_Plaryer = self.playerNode.getComponent(Prefab_Plaryer);
            self.compList.forEach(value => {
                if (value.getEnemy().y <= -650) {
                    value.node.x = 10000;
                    value.node.y = 10000;
                }
                const distance = self.getPlayerDistance(playerComp.getPlaryer(), value.getEnemy());
                if (distance <= value.node.width) {
                    self.unschedule(updata);
                    self.overActive = true;
                   self.compList.forEach(comp =>{
                       comp.node.removeFromParent();
                       self.nodePool.put(comp.node);
                   });
                    self.setOver();
                }
                self.bulletList.forEach(bullet => {
                    const distance = self.getPlayerDistance(value.getEnemy(), bullet.getBullet());
                    if (bullet.getBullet().y >= 650) {
                        bullet.node.y = 200000;
                        bullet.node.x = 100000;
                    }
                    if (distance <= value.node.height / 2) {
                        if (value.getTime() < value.getBlood()) {
                            value.addTime();
                            bullet.node.y = 200000;
                            bullet.node.x = 100000;

                        }
                        if (value.getTime() === value.getBlood()) {
                            value.node.x = 10000;
                            value.node.y = 10000;
                            bullet.node.y = 200000;
                            bullet.node.x = 100000;
                            self.scoreNow = self.scoreNow + value.getBlood();
                            self.Score.string = self.scoreNow.toString();
                        }
                    }
                });
            });
        }
        this.schedule(updata, 0);
    }


    private onKeyDown(event) {
        switch (event.keyCode) {
            case cc.KEY.j:
                this.accFire = true;
                this.bulletFire();
                break;
        }
    }

    private onKeyUp(event) {
        switch (event.keyCode) {
            case cc.KEY.j:
                this.accFire = false;
                break;
        }

    }

    private bulletFire() {
        if (this.accFire === true) {
            const playerComp: Prefab_Plaryer = this.playerNode.getComponent(Prefab_Plaryer);
            const bulletNode = this.getUnUseNode(this.bulletPrefab);
            bulletNode.x = playerComp.getPlaryer().x;
            bulletNode.y = playerComp.getPlaryer().y;
            this.node.addChild(bulletNode);
            this.bulletList.push(bulletNode.getComponent(Prefab_Bullet));
        }
    }

    private bgMove(bgList, bgSpeed) {
        for (let index = 0; index < bgList.length; index++) {
            bgList[index].y -= bgSpeed;
        }

        if (bgList[0].y <= 20 - bgList[0].height) {
            bgList[0].y = 1136;
        }

        if (bgList[1].y <= 1156 - 2 * bgList[1].height) {
            bgList[1].y = 1136;
        }
    }

    private setOver() {
        cc.log(this.scoreNow);
        const overNode = this.getUnUseNode(this.gameOver);
        this.node.addChild(overNode);
        const overComp: Win_GameOver = overNode.getComponent(Win_GameOver);
        overComp.initWithData(Number(this.Score.toString()));
    }

    private getUnUseNode(Prefab: cc.Prefab) {
        let node: cc.Node = null;
        if (this.nodePool.size() > 0) {
            node = this.nodePool.get();
        } else {
            node = cc.instantiate(Prefab);
        }
        return node;
    }

    private spawnNewEnemy() {
        const self = this;
        const function1 = function () {
            if (self.overActive === true) {
                self.unschedule(function1);
            }
            const node = self.getUnUseNode(self.enemy1Prefab);
            self.node.addChild(node);
            node.setPosition(self.getNewPosition());
            const enemy1Comp: Prefab_Enemy = node.getComponent(Prefab_Enemy);
            self.compList.push(enemy1Comp);
        }
        this.schedule(function1, 1);
        const function2 = function () {
            if (self.overActive === true) {
                self.unschedule(function2);
            }
            const node = self.getUnUseNode(self.enemy2Prefab);
            self.node.addChild(node);
            node.setPosition(self.getNewPosition());
            const enemy1Comp: Prefab_Enemy = node.getComponent(Prefab_Enemy);
            self.compList.push(enemy1Comp);
        }
        this.schedule(function2, 3);
        const function3 = function () {
            if (self.overActive === true) {
                self.unschedule(function3);
            }
            const node = self.getUnUseNode(self.enemy3Prefab);
            self.node.addChild(node);
            node.setPosition(self.getNewPosition());
            const enemy1Comp: Prefab_Enemy = node.getComponent(Prefab_Enemy);
            self.compList.push(enemy1Comp);
        }
        this.schedule(function3, 5);
    }

    private getNewPosition() {
        var randX = 0;
        // 根据地平面位置和主角位置，随机得到敌机的 y 坐标
        var randY = this.node.height / 2;
        var maxX = this.node.width / 2 - 20;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    }


    private clearNodePool() {
        const nodes = this.node.children;
        while (nodes.length > 0) {
            const node = nodes[0];
            node.removeFromParent();
            this.nodePool.put(node);
        }
    }

    private getPlayerDistance(player: cc.Vec2, enemy: cc.Vec2) {
        const playerPos = player;
        const dist = enemy.sub(playerPos).mag();
        return dist;
    }

    private nodePool: cc.NodePool = new cc.NodePool;
    private bgList: cc.Node[] = [];
    private accFire: boolean;
    private compList: Prefab_Enemy[] = [];
    private bulletList: Prefab_Bullet[] = [];
    private scoreNow: number;
    private overActive: boolean;
}
export const uiPalnceGame = new Win_planeGame();