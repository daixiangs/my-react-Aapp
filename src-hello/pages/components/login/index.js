import React from 'react';
import './index.scss';
import {Form, Card, Input, Icon, Checkbox, Button, message} from 'antd';

const FormItem = Form.Item;

 class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        
        console.log(this.props.form.getFieldsValue(), 177)
        this.props.form.validateFields((err, value)=>{
            if(!err){
                message.success("登录成功")
                console.log(value, 17);
                this.props.form.resetFields()
            }
            
        })
    }
    render(){
        const {getFieldDecorator} =this.props.form;
        return(<div>
            <Card title="登录表单">
            <Form style={{width: '30%'}} onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('userName',{
                        initialValue: '',
                        validateFirst: false,
                        rules:[
                            {
                                required: true,
                                message: '姓名不能为空'
                            },
                            {
                                min: 2,max: 5,
                                message: '输入的字符长度不在范围内！'
                            },
                            {
                                pattern: new RegExp('^\\w+$', 'g'),
                                message: '用户名必须为字母或者数字'
                            }
                        ]

                    })(
                        <Input placeholder="请输入姓名" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('passWord',{
                        initialValue: '',
                        validateFirst: false,
                        rules:[
                            {
                                required: true,
                                message: '密码不能为空'
                            },
                            {
                                min: 2,max: 5,
                                message: '输入的字符长度不在范围内！'
                            }
                        ]

                    })(
                        <Input placeholder="请输入密码" type="password" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember',{
                        initialValue: true,
                        valuePropName: 'checked'

                    })(
                        <Checkbox>记住密码</Checkbox>
                    )}
                    <a style={{float: 'right'}} >忘记密码</a>
                </FormItem>
                <Button block={true} type="primary" htmlType="submit" >登录</Button>
            </Form>
            </Card>
        </div>)
    }
}

export default Form.create()(Login);