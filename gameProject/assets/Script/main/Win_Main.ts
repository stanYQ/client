import Prefab_Game from "./Prefab_Game";

const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Win_Main extends cc.Component {
    @property({
        type: cc.Button,
        tooltip: "返回按钮"
    })
    backBtn: cc.Button = null;

    @property({
        type: cc.ScrollView,
        tooltip: "游戏列表"
    })
    gameList: cc.ScrollView = null;

    @property({
        type: cc.Prefab,
        tooltip: "游戏名称按钮预设"
    })
    gamePrefab: cc.Prefab = null;

    onLoad() {
        this.backBtn.node.on("click", this.onbackBtnClicked, this);
        this.showData();
    }

    onDestroy() {
        this.backBtn.node.off("click", this.onbackBtnClicked, this);
    }

    private showData() {
        this.clearNodePool();
        this.nameData.forEach(name => {
            this.addGame(name);
        })
    }

    private addGame(name: string) {
        const gameNode = this.getUnUseNode();
        this.gameList.content.addChild(gameNode);
        const gameComp: Prefab_Game = gameNode.getComponent(Prefab_Game);
       gameComp.initWithData(name);

    }


    private onbackBtnClicked() {
        cc.director.loadScene("signIn");
    }

    private getUnUseNode() {
        let node: cc.Node = null;
        if (this.nodePool.size() > 0) {
            node = this.nodePool.get();
        } else {
            node = cc.instantiate(this.gamePrefab);
        }
        return node;
    }

    private clearNodePool() {
        const nodes = this.gameList.content.children;
        while (nodes.length > 0) {
            const node = nodes[0];
            node.removeFromParent();
            this.nodePool.put(node);
        }
    }

    private nameData: string[] = ["plane", "sdjjsdjl"];
    private bName: string;
    private nodePool: cc.NodePool = new cc.NodePool;
}