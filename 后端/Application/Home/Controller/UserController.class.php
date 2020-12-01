<?php
namespace Home\Controller;

use Think\Controller;
class UserController extends BaseController {
    //用户注册
    public function sign(){
		if(!$_POST['username']){
            //校验参数是否存在
			$return_data=array();
			$return_data['error_code']=1;
			$return_data['msg']='参数不足：username';
			$this->ajaxReturn($return_data);
		}
		if(!$_POST['phone']){
            $return_data=array();
            $return_data['error_code']=1;
            $return_data['msg']='参数不足：phone';
            $this->ajaxReturn($return_data);
        }
		if(!$_POST['face_url']){
			$return_data  = array();
			$return_data['error_code'] =1;
			$return_data['msg'] = '参数不足：face_url';
			$this->ajaxReturn($return_data);
		}
		//检测该账户是否被注册

		$where = array();
		$where['phone']=$_POST['phone'];
		$User = M('User_book');       

		$user= $User->where($where)->find();
		if($user){
			$return_data=array();
			$return_data['error_code']=3;
			$return_data['msg']='该手机号已被注册';
            $this->ajaxReturn($return_data);
		}
		else{
			//如果用户尚未注册，则注册
			$data=array();
			$data['username']=$_POST['username'];
			$data['phone']=$_POST['phone'];
			$data['face_url']=$_POST['face_url'];
			//dump(data);
            //插入数据
            $result=$User->add($data);
            //插入成功，返回该数据id
            if($result){
                //插入数据成功
                $return_data['error_code']=0;
                $return_data['msg']='注册成功';
                $return_data['data']['user_id']=$result;
                $return_data['data']['username']=$_POST['username'];
                $return_data['data']['phone']=$_POST['phone'];
                $return_data['data']['face_url']=$_POST['face_url'];
            }
            else{
                //插入数据执行失败
                $return_data=array();
                $return_data['error_code']=4;
                $return_data['msg']='注册失败';
                $this->ajaxReturn($return_data);
            }
		}
		//var_dump(789);
	}
	//用户登录
	public function login(){
		//校验参数是否存在
		if(!$_POST['phone']){
			$return_data=array();
			$return_data['error_code']=1;
			$return_data['msg']='参数不足：phone';
			$this->ajaxReturn($return_data);
		}
		if(!$_POST['username']){
			$return_data=array();
			$return_data['error_code']=1;
			$return_data['msg']='参数不足：username';
			$this->ajaxReturn($return_data);
		}
		//查询用户
		$User = M('User_book');
		$where=array();
		$where['phone']=$_POST['phone'];
		$user=$User->where($where)->find();
		if($user){
			//如果查询到该手机用户
			if($_POST['username']!=$user['username']){
				$return_data=array();
				$return_data['error_code']=3;
				$return_data['msg']='用户名不正确，请重新输入';
				$this->ajaxReturn($return_data);
			}
			else{
				//用户信息一致
				$return_data=array();
				$return_data['error_code']=0;
				$return_data['msg']='登录成功';
				$return_data['data']['user_id']=$user['user_id'];
				$return_data['data']['username']=$user['username'];
				$return_data['data']['phone']=$user['phone'];
				$return_data['data']['face_url']=$user['face_url'];
				$this->ajaxReturn($return_data);
			}
		}
		else{
			$return_data=array();
			$return_data['error_code']=2;
			$return_data['msg']='不存在该手机用户，请注册';
			$this->ajaxReturn($return_data);
		}
	}	
}
