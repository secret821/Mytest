export const addDragDemo = (stage:FYGE.Stage) => {
    const gameWrapper = new FYGE.Sprite();
    stage.addChild(gameWrapper);

    const PIC_URLS = [
        '//yun.duiba.com.cn/aurora/assets/cd16134f2544202ed5676adbd5114286aec44347.png',
        '//yun.duiba.com.cn/aurora/assets/c55dcd277542a6c3e983278ae5835d89848b9bd9.png',
        '//yun.duiba.com.cn/aurora/assets/b42c49baaf8754139d2e940fe97ba1cb289b11fa.png',
        '//yun.duiba.com.cn/aurora/assets/4a4b850995da348ccd5fb520d5b9ef5e0fb8349f.png',
        '//yun.duiba.com.cn/aurora/assets/5b3e3b52f406df1543e2eeca1ce11719a28c6401.png',
        '//yun.duiba.com.cn/aurora/assets/cae0529d1ff2eaa323dc0615d12a1f05e3a67c06.png',
        '//yun.duiba.com.cn/aurora/assets/5b91853f9d87de73e319d42ea9df139ddd89d537.png',
        '//yun.duiba.com.cn/aurora/assets/a2893c5a0d03ca3252160de1584584e18abe2a4a.png',
        '//yun.duiba.com.cn/aurora/assets/c36b0851f61a812e6d745bc205c0551b6590d11d.png',        
    ]

    // 创建初始的游戏静态数据
    const fill = (size) =>{
        const list = [];
        for (let i = 0;i < size;i++){
            list.push(i)
        }
        return list;
    }

    const GAME_SIZE = 3;

    const INIT_DATA:any = fill(GAME_SIZE * GAME_SIZE);//数据为图片id，从0开始（图片索引）
    let gamedata = JSON.parse(JSON.stringify(INIT_DATA));//深拷贝
    gamedata.shuffle();//打乱图片，后续需要和INIT_DATA做对比
    console.log(
        '初始打乱的图片数据',
        gamedata.map(i => (i + 1))
    )

    // 把row，col转化为游戏数组的index
    function getIndex(row,col,maxCol){
        let index;
        index = row * maxCol + col;
        return index
    }

    // 鼠标按下起始点
    let startPoint;
    //图片起始位置
    let currPicOriginPos;
    let currentPic: FYGE.DisplayObject;

    //图片尺寸
    const PIC_SIZE = 200
    //每个图片间隔的位置
    const GAP = 2;

    const onStageMove = (event: FYGE.MouseEvent) =>{
        //鼠标当前位置
        const currentPoint = {x: event.stageX, y: event.stageY}
        //鼠标按下点到鼠标当前点的偏移量
        let mouseOffsetX = currentPoint.x - startPoint.x
        let mouseOffsetY = currentPoint.y - startPoint.y

        //图片最终的位置     图片起始位置           偏移量
        currentPic.x = currPicOriginPos.x + mouseOffsetX
        currentPic.y = currPicOriginPos.y + mouseOffsetY
    }

    const onMouseUp_pic = () =>{
        //鼠标抬起后应该移出舞台移动事件，否则会重复添加事件
        gameWrapper.stage.removeEventListener(FYGE.MouseEvent.MOUSE_MOVE,onStageMove,this);

        // 图片中心点位置     图片最终位置       
        const picCenterX = currentPic.x + PIC_SIZE/2;
        const picCenterY = currentPic.y + PIC_SIZE/2;

        //获取所落下碎片的row/col
        const dropCol = Math.floor(picCenterX / PIC_SIZE)
        const dropRow = Math.floor(picCenterY / PIC_SIZE)

        //把row/col转化为游戏数组的index
        const dropIndex = getIndex(dropRow,dropCol,GAME_SIZE)
        const dropId = gamedata[dropIndex];

        //当前视图数据
        const dropPic = getPicDisplayById(dropId);

        //未拖动碎片的显示对象
        const currentPicId = getPicId(currentPic);

        //当前图片数组下标 index
        const currentPicIndex = gamedata.indexOf(currentPicId);
        console.log('上一个数据',gamedata.map(i => (i + 1)))

        /** 
         * @currentPicIndex 拖动碎片ID在gamedata中的索引
         * @dropIndex 落下碎片的ID在gamedata中的索引
         * @public
         * @type {number}
        */
        swap(currentPicIndex,dropIndex,gamedata);
        console.log('交换后的数据', gamedata.map(i => (i + 1)))

        currentPic.x = dropPic.x
        currentPic.y = dropPic.y

        dropPic.x = currPicOriginPos.x
        dropPic.y = currPicOriginPos.y

        if(equalTo(INIT_DATA,gamedata)){
            setTimeout(() =>{
                alert('哈哈,赢啦～')
            },500)
        }
    }

    const onMouseDown_picItem = (event: FYGE.MouseEvent) =>{
        currentPic = event.target;
        //图片鼠标弹起事件，事件触发一次即移除，否则会重复添加鼠标弹起事件
        currentPic.once(FYGE.MouseEvent.MOUSE_UP,onMouseUp_pic,this);

        //添加舞台移动事件，鼠标移动即触发
        //FYGE.MouseEvent.MOUSE_MOVE 会在鼠标移动过程中触发
        gameWrapper.stage.addEventListener(FYGE.MouseEvent.MOUSE_MOVE,onStageMove,this)

        //event事件对象
        //event.stageX，event.stageY当前鼠标在舞台的位置
        startPoint = { x: event.stageX, y: event.stageY}

        currPicOriginPos = { x: currentPic.x,y :currentPic.y }

        gameWrapper.addChild(currentPic);//把当前图片移动到最上层
    }


    const PIC_DISPLAY_LIST = INIT_DATA.map(data => FYGE.Sprite.fromUrl(PIC_URLS[data]))//图片视图数据
    const getPicDisplayById = (id) => PIC_DISPLAY_LIST[id];//获取视图数据方法
    const getPicId = (picDisplay) =>{
        for(let i = 0;i<PIC_DISPLAY_LIST.length;i++){
            const element = PIC_DISPLAY_LIST[i]
            if (element == picDisplay)
                return i
        }
        return -1;
    }


    //通过判断INIT_DATA和gamedata是否相同来判定游戏是否胜利。
    const equalTo = (array1: any[],array2:any[]) =>{
        if(array1.length != array1.length) return false
        const len = array1.length || array1.length;
        for(let i = 0;i < len;i++){
            const a = array1[i]
            const b = array2[i]
            if(a != b)
                return false 
        }
        return true
    }//判断数组是否相等

    //数组元素交换
    const swap = (index1,index2,list) =>{
        const ele1 = list[index1]
        const ele2 = list[index2]
        list[index2] = ele1
        list[index1] = ele2
        return list
    }

    //生成游戏
    gamedata.map((data,index) => {
        const picItem = gameWrapper.addChild(getPicDisplayById(data));
        const col = index % GAME_SIZE;
        const row = Math.floor(index / GAME_SIZE);

        picItem.x = col * (PIC_SIZE + GAP)
        picItem.y = row * (PIC_SIZE + GAP)

        //增加鼠标按下事件
        picItem.addEventListener(FYGE.MouseEvent.MOUSE_DOWN,onMouseDown_picItem,this)

        return picItem
    })
}
