import React from 'react';
import './index.scss';
import {Form, Card, Input, Icon, Radio, InputNumber, Select, Switch, Upload,message, Checkbox,Button, DatePicker} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;



 class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            imageUrl: ''
        }
    }
    getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
     beforeUpload=(file)=> {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
      }
      handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
      }
    render(){
        const {getFieldDecorator} =this.props.form;
        const FormItemLayout = {
            labelCol: {
                span: 2
            },
            wrapperCol:{
                span: 6
            }
        };
        const offsetLayout = {
            wrapperCol:{
                span: 6,
                offset: 2
            }
        };
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        return(<div>
            <Card title="注册表单">
            <Form  onSubmit={this.handleSubmit} {...FormItemLayout}>
                <FormItem label="姓名">
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
                                pattern: new RegExp('^\w+$', 'g'),
                                message: '用户名必须为字母或者数字'
                            }
                        ]

                    })(
                        <Input placeholder="请输入姓名" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} />
                    )}
                </FormItem>
                <FormItem label="密码">
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
                <FormItem label="性别">
                    {getFieldDecorator('sex',{
                        initialValue: "0"
                    })(
                        <RadioGroup>
                            <Radio value="0">男</Radio>
                            <Radio value="1">女</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem label="年龄">
                    {getFieldDecorator('age',{
                        initialValue: 22,
                    })(
                    <InputNumber min={18} max={99}/>
                    )}
                </FormItem>
                <FormItem label="当前薪资">
                    {getFieldDecorator('pay',{
                        initialValue: "22k",
                    })(
                        <Select style={{width: 200}} >
                        <Option value='1'>18k</Option>
                        <Option value='2'>25k</Option>
                        <Option value='3'>36k</Option>
                        <Option value='4'>48k</Option>
                        <Option value='5'>薪资无法估量</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem label="爱好">
                    {getFieldDecorator('hobby',{
                        initialValue: ["打篮球","踢足球"],
                    })(
                        <Select  mode="multiple" showSearch={true}>
                        <Option value='打篮球'>打篮球</Option>
                        <Option value='踢足球'>踢足球</Option>
                        <Option value='跑步'>跑步</Option>
                        <Option value='打乒乓球'>打乒乓球</Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem label="是否已婚">
                    {getFieldDecorator('married',{
                        initialValue: false,
                        valuePropName: 'checked'
                    })(
                        <Switch checkedChildren="是" unCheckedChildren="否"></Switch>
                    )}
                </FormItem>
                <FormItem label="生日">
                    {getFieldDecorator('brithday',{
                        initialValue: moment('01/01/2015', 'DD/MM/YYYY'),
                    })(
                        <DatePicker placeholder="请选择日期" format={['DD/MM/YYYY','DD/MM/YY']} ></DatePicker>
                    )}
                </FormItem>
                <FormItem label="地址">
                    {getFieldDecorator('address',{
                        initialValue: "北京市湘江道128号",
                    })(
                        <TextArea autosize={{minRows:2,maxRows:5}}/>
                    )}
                </FormItem>
                <FormItem label="头像">
                    {getFieldDecorator('userImg',{
                        // initialValue: "北京市湘江道128号",
                    })(
                        <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="//jsonplaceholder.typicode.com/posts/"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                      >
                        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
                      </Upload>
                    )}
                </FormItem>
                <FormItem {...offsetLayout}>
                    {getFieldDecorator('deal',{
                        initialValue: true,
                        valuePropName: 'checked'
                    })(
                        <Checkbox>我已阅读并同意<a fref="">此协议</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...offsetLayout}>
                <Button type="primary" onClick={this.handleSubmit} style={{marginRight:30}}>注册</Button>
                <Button onClick={this.resetFields}>重置</Button>
                </FormItem>
            </Form>
            </Card>
        </div>)
    }

    resetFields = ()=> {
        this.props.form.resetFields();
        this.setState({
            imageUrl: ''
        })
    }
    handleSubmit =() => {
        this.props.form.validateFields((err, values)=>{
            if(!err){
                console.log(values, 213)
            }
        })
    }
}

export default Form.create()(Login);