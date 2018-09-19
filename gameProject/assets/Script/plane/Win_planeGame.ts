import Prefab_Plaryer from "../cnm/Prefab_Plaryer";
import Prefab_Enemy1 from "../cnm/Prefab_Enemy1";

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

    onLoad() {
        this.bgList[0] = this.bg1;
        this.bgList[1] = this.bg2;
        this.accFire = false;
        //键盘监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.spawnNewEnemy();
    }

    update(dt) {
        this.bgMove(this.bgList, this.bgSpeed);
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
        this.schedule(function () {
            const node = self.getUnUseNode(self.enemy1Prefab);
            self.node.addChild(node);
            node.setPosition(self.getNewPosition());
        },1);
        this.schedule(function () {
            const node = self.getUnUseNode(self.enemy2Prefab);
            self.node.addChild(node);
            node.setPosition(self.getNewPosition());
        },3);
        this.schedule(function () {
            const node = self.getUnUseNode(self.enemy3Prefab);
            self.node.addChild(node);
            node.setPosition(self.getNewPosition());
        },5);
    }

    private getNewPosition() {
        var randX = 0;
        // 根据地平面位置和主角位置，随机得到敌机的 y 坐标
        var randY = Math.random() * this.node.y ;
        var maxX = this.node.width / 2 - 20;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    }

    private nodePool: cc.NodePool = new cc.NodePool;
    private bgList: cc.Node[] = [];
    private accFire: boolean;
}
export const uiPalnceGame = new Win_planeGame();