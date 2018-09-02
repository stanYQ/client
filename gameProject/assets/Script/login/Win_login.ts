const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Win_login extends cc.Component {
    @property({
        type: cc.Button,
        tooltip: "登录按钮"
    })
    loginBtn: cc.Button = null;

    @property({
        type: cc.EditBox,
        tooltip: "用户名输入框"
    })
    nameEditBox: cc.EditBox = null;

    @property({
        type: cc.EditBox,
        tooltip: "密码输入框"
    })
    passwordEditBox: cc.EditBox = null;

    @property({
        type: cc.Button,
        tooltip: "退出按钮"
    })
    closeBtn: cc.Button = null;

    @property({
        type: cc.Prefab,
        tooltip: "提示框"
    })
    tipPrefab: cc.Prefab = null;

    onLoad() {
        this.Monitor();
    }

    onDisable() {
        this.unMonitor();
    }

    private Monitor() {
        this.loginBtn.node.on("click", this.onLoginBtnClicked, this);
        this.closeBtn.node.on("click", this.onCloseBtnClicked, this);
    }

    private unMonitor() {
        this.loginBtn.node.off("click", this.onLoginBtnClicked, this);
        this.closeBtn.node.off("click", this.onCloseBtnClicked, this);
    }

    private onLoginBtnClicked() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log(response);
            }
        };
        xhr.open("GET", "http://192.168.42.247:5000/login", true);
    }


    private onCloseBtnClicked() {
        const Prefab = cc.instantiate(this.tipPrefab);
        this.node.addChild(Prefab);
    }

    public name: string;
    public passWord: string;
}