<?php
namespace Home\Controller;

use Think\Controller;
class MessageController extends BaseController {
    //发布器械信息
    public function publish_new_euqipment_message(){
        //校验参数是否存在
        if(!$_POST['user_id']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：user_id';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['username']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：username';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['face_url']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：face_url';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['word_content']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：word_content';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['picture_content']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：picture_content';
            $this->ajaxReturn($return_data);
        }
        
        //设置插入数据
        $Equipment_message = M('Equipment_message');
        $data=array();
        $data['user_id']=$_POST['user_id'];    //用户id
        $data['username']=$_POST['username'];  //用户名
        $data['face_url']=$_POST['face_url'];  //用户头像地址
        $data['word_content']=$_POST['word_content'];   //器材文字信息
        $data['picture_content']=$_POST['picture_content'];    //器材图片信息
        $data['state']=0;   //当前租借状态，0代表未借出，1代表已借出
        $data['borrower_id']=0;   //租借人id
        $data['borrower_name']=0;   //租借人用户名
        $data['send_timestamp']=time();   //当前时间戳

        //插入数据
        $result = $Equipment_message->add($data);
        if($result){
            $return_data = array();
            $return_data['error_code'] = 0;
            $return_data['msg']='数据添加成功';
            $return_data['data']['user_id']=$_POST['user_id'];
            $return_data['data']['username']=$_POST['username'];
            $return_data['data']['face_url']=$_POST['face_url'];
            $return_data['data']['word_content']=$_POST['word_content'];
            $return_data['data']['picture_content']=$_POST['picture_content'];
            $return_data['data']['state']=0;
            $this->ajaxReturn($return_data);
        }
        else{
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg']='数据添加失败';
            $this->ajaxReturn($return_data);
        }
    }

    //删除器械信息
    public function delete_equipment_message(){
        //校验参数是否存在
        if(!$_POST['user_id']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：user_id';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['word_content']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：word_content';
            $this->ajaxReturn($return_data);
        }
        
        //设置删除数据信息
        $Equipment_message = M('Equipment_message');
        $where=array();
        $where['user_id']=$_POST['user_id'];    //用户id
        $where['word_content']=$_POST['word_content'];   //器材文字信息

        //删除数据
        $result = $Equipment_message->where($where)->delete();
        if($result){
            $return_data = array();
            $return_data['error_code'] = 0;
            $return_data['msg']='数据删除成功';
            $this->ajaxReturn($return_data);
        }
        else{
            $return_data = array();
            $return_data['error_code'] = 2;
            $return_data['msg']='数据删除失败';
            $this->ajaxReturn($return_data);
        }
    }

    //租借器械
    public function borrow_message(){
        //校验参数 
        if(!$_POST['user_id']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：user_id';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['word_content']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：word_content';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['borrower_id']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：borrower_id';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['borrower_name']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：borrower_name';
            $this->ajaxReturn($return_data);
        }

        $Equipment_message = M('Equipment_message');
        //查询条件

        $where=array();
        $where['user_id']=$_POST['user_id'];
        $where['word_content']=$_POST['word_content'];
        $message =$Equipment_message->where($where)->find();

        //判断该数据是否存在
        //dump($where);
        if(!$message){
            $return_data=array();
            $return_data['error_code']=2;
            $return_data['msg']='指定信息不存在';
            $this->ajaxReturn($return_data);
        }
        //构造更新数据
        $data=array();
        $data['state']=1;
        $data['borrower_id']=$_POST['borrower_id'];
        $data['borrower_name']=$_POST['borrower_name'];
        //构造保存条件
        $where=array();
        $where['user_id']=$_POST['user_id'];
        $where['word_content']=$_POST['word_content'];
        //dump($data);
        $result=$Equipment_message->where($where)->save($data);
        //dump($where);
        if($result){
            $return_data = array();
            $return_data['error_code']=0;
            $return_data['msg']='数据保存成功';
            $return_data['data']['user_id']=$_POST['user_id'];
            $return_data['data']['word_content']=$_POST['word_content'];
            $return_data['data']['state']=1;
            $return_data['data']['borrower_id']=$_POST['borrower_id'];
            $return_data['data']['borrower_name']=$_POST['borrower_name'];
            $this->ajaxReturn($return_data);

        }
        else{
            $return_data = array();
            $return_data['error_code']=2;
            $return_data['msg']='数据保存失败';
            $this->ajaxReturn($return_data);

        }


    }

    //归还信息
    public function return_message(){
        //校验参数 
        if(!$_POST['user_id']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：user_id';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['word_content']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：word_content';
            $this->ajaxReturn($return_data);
        }
        if(!$_POST['borrower_id']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：borrower_id';
            $this->ajaxReturn($return_data);
        }

        $Equipment_message = M('Equipment_message');
        //查询条件
        $where=array();
        $where['user_id']=$_POST['user_id'];
        $where['word_content']=$_POST['word_content'];
        $where['borrower_id']=$_POST['borrower_id'];
        $message =$Equipment_message->where($where)->find();

        //判断该数据是否存在
        if(!$message){
            $return_data=array();
            $return_data['error_code']=2;
            $return_data['msg']='指定信息不存在';
            $this->ajaxReturn($return_data);
        }
        //构造更新数据
        $data=array();
        $data['state']=0;
        $data['borrower_id']=0;
        $data['borrower_name']=0;
        //构造保存条件
        $where=array();
        $where['user_id']=$_POST['user_id'];
        $where['word_content']=$_POST['word_content'];
        $where['borrower_id']=$_POST['borrower_id'];

        $result=$Equipment_message->where($where)->save($data);

        if($result){
            $return_data = array();
            $return_data['error_code']=0;
            $return_data['msg']='数据保存成功';
            $return_data['data']['user_id']=$_POST['user_id'];
            $return_data['data']['word_content']=$_POST['word_content'];
            $return_data['data']['state']=0;
            $this->ajaxReturn($return_data);

        }
        else{
            $return_data = array();
            $return_data['error_code']=2;
            $return_data['msg']='数据保存失败';
            $this->ajaxReturn($return_data);

        }


    }

    //获取全部信息
    public function get_all_message(){
        //实例化数据表
        $Equipment_message = M('Equipment_message');
        //获取全部信息
        $all_message = $Equipment_message->select();

        $return_data = array();
        $return_data['error_code']=0;
        $return_data['msg']='数据获取成功';
        $return_data['data']=$all_message;
        $this->ajaxReturn($return_data);
    }
    
    //获取个人发布全部信息
    public function get_person_message(){
        //实例化数据表
        $Equipment_message = M('Equipment_message');
        //检验参数是否存在
        if(!$_POST['user_id']){
            $return_data = array();
            $return_data['error_code'] = 1;
            $return_data['msg'] = '参数不足：user_id';
            $this->ajaxReturn($return_data);
        }

        //设置查询条件
        $where=array();
        $where['user_id']=$_POST['user_id'];
        //查询个人发布信息
        
        $person_message=$Equipment_message->where($where)->select();

        if($person_message){
            $return_data=array();
            $return_data['error_code']=0;
            $return_data['msg']='查询到该同学发布全部信息';
            $return_data['data']=$person_message;
            $this->ajaxReturn($return_data);

        }
        else{
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='未查询到数据';
            $this->ajaxReturn($return_data);
        }
    }
}