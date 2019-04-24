import React from 'react';
import {Card, Form, Input, Icon, Checkbox, Button, Radio, Select, Upload, Row, Col} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class Form2 extends React.Component{


    handleSubmit = (e)=> {
        e.preventDefault();

        this.props.form.validateFields(['userName', 'passWord', 'three'],{
            first: true
        },(err, value)=> {

        })
    }
    render(){
        const {getFieldDecorator}=this.props.form;
        const layoutItem ={
            wrapperCol:{
                span:8
            }
        }
        return(<div>
              <Card title="登录表单">
                <Row>
                    <Col span={18} style={{background:'green'}} push={6}>col-18 col-push-6</Col>
                    <Col span={6} style={{background:'red'}} pull={18}>col-6 col-pull-18</Col>
                </Row>
                    <Form {...layoutItem}>
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    initialValue: '',
                                    // validateFirst: true,
                                   rules: [
                                        {
                                            required: true,
                                            message: '姓名不能为空'
                                        },
                                        {
                                            min: 2,max: 5,
                                            message: '字符长度不符合规范'
                                        },
                                       {
                                           pattern: new RegExp('^\w+$', 'g'),
                                           message: '用户名必须为字母或者数字'
                                       }
                                   
                                    ]
                                })(
                                    <Input placeholder="请输入姓名" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('passWord',{
                                    initialValue: '',
                                    validateFirst: true, 
                                   rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        },
                                        {
                                            min: 2,max: 5,
                                            message: '字符长度不符合规范'
                                        }
                                   
                                    ]
                                })(
                                    <Input placeholder="请输入密码" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('three',{
                                    initialValue: '',
                                    validateFirst: true,
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        },
                                        {
                                            min: 2,max: 5,
                                            message: '字符长度不符合规范'
                                        }

                                    ]
                                })(
                                    <Input placeholder="请输入密码" prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember',{
                                    initialValue: true,
                                    valuePropName: 'checked'
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a style={{float: 'right'}}>忘记密码</a>
                            <Button type="primary" onClick={this.handleSubmit} block={true}>登录</Button>
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('sex',{
                                    initialValue: 0,
                                })(
                                    <RadioGroup>
                                        <Radio value={0}>男</Radio>
                                        <Radio value={1}>女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('hobby',{
                                    initialValue: "打篮球",
                                })(
                                    <Select mode="multiple" showSearch={true} clearIcon={<Icon type="lock"/>}>
                                        <Option value="打篮球">打篮球</Option>
                                        <Option value="踢足球">踢足球</Option>
                                        <Option value="跑步">跑步</Option>
                                        <Option value="睡觉">睡觉</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('address',{
                                    initialValue: "北京市湘江路128号",
                                })(
                                        <TextArea autosize={{minRows: 2,maxRows:5}}/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userImg',{
                                    // initialValue: "北京市湘江路128号",
                                })(
                                    <Upload
                                    
                                    />
                                )
                            }
                        </FormItem>
                    </Form>
              </Card>  
        </div>)
    }
}

export default  Form.create()(Form2)