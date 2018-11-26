import java.nio.ByteBuffer;
import java.nio.channels.*;
import java.net.*;
import java.io.*;

class AsyncClient {
    private final int MAX_LENGTH = 1024;
    private SocketChannel sc;
    private ByteBuffer r_buff = ByteBuffer.allocate(MAX_LENGTH);
    private ByteBuffer w_buff = ByteBuffer.allocate(MAX_LENGTH);
    private static String host = "127.0.0.1";
    private static int port = 9000;

    public AsyncClient() {
        try {
            InetSocketAddress addr = new InetSocketAddress(host, port);
            sc = SocketChannel.open();
            sc.connect(addr);
            while (!sc.finishConnect()) ;
            System.out.println("链接已建立");
            while (true) {
                String echo;
                try {
                    System.out.println("请输入要发送的消息：");
                    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
                    echo = br.readLine();
                    w_buff.clear();
                    w_buff.put(echo.getBytes());
                    w_buff.flip();

                } catch (IOException ioe) {
                    System.err.println("I/O异常");
                }
                while (w_buff.hasRemaining())
                    sc.write(w_buff);
                w_buff.clear();
                Rec();
                Thread.currentThread().sleep(1000);
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
            ;
        } catch (InterruptedException ie) {
            ie.printStackTrace();
        }
    }

    public void Rec() throws IOException {
        int count;
        r_buff.clear();
        count = sc.read(r_buff);
        r_buff.flip();
        byte[] temp = new byte[r_buff.limit()];
        r_buff.get(temp);
        System.out.println("发送" + count + "个字节，内容:" + new String(temp));
    }

    public static void main(String[] args) {
        new AsyncClient();
    }
}

