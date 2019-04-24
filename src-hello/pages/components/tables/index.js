import React from 'react';
import {Card, Tabs, Table,Button, Form,Input, Modal, Radio, InputNumber, Select, message} from 'antd';
import tableList from '../../../mock/tableList';
let cloneData = [...tableList]

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option

class Tables extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataSource: [],
            visible: false,
            selectedKey: '',
            modleTitle: '',
            initialValue: {
                name: '刘德华',
                sex: 0,
                age: 18,
                company: '中国银行',
                pay: '18k' 
            }
        }
    }
    componentWillMount(){
        this.setState({
            dataSource: tableList
        })
    }
    render(){
        const FormItemLayout = {
            labelCol:{
                span:4
            },
            wrapperCol:{
                span: 8
            }
        };
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render: (text, record)=> text === 0 ? '男' : '女'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '就职公司',
                dataIndex: 'company',
                key: 'company',
            },
            {
                title: '薪资',
                dataIndex: 'pay',
                key: 'pay',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'acton',
                align: 'center',
                width:'15%',
                render:(texe, record)=>{
                    return <span>
                        <Button style={{marginRight:10}} onClick={this.changeItem.bind(this, record)}>修改</Button>
                        <Button type="danger" onClick={this.deleteRow.bind(this, record)}>删除</Button>
                    </span>
                }
            }
        ];
        const {getFieldDecorator} =this.props.form
        let {
                name,
                sex,
                age,
                company,
                pay
            }=this.state.initialValue;
        return(
            <Tabs defaultActiveKey="1">
                <TabPane tab="Tab 1" key="1">
                <Form layout="inline">
                    <FormItem>
                        {getFieldDecorator('searchName')(
                            <Input placeholder='请输入要查询的姓名'/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button style={{marginRight:20}} icon="search" type="primary" onClick={this.searchRow}>搜索</Button>
                        <Button style={{marginRight:20}} disabled onClick={this.resetData}>刷新</Button>
                        <Button type="primary" onClick={this.addRow}>新增</Button>
                    </FormItem>
                </Form>
                <Table
                        size='middle'
                        bordered
                        style={{marginTop: 20}}
                        // pagination ={page}
                        columns ={columns}
                        dataSource={this.state.dataSource}
                    />

                    <Modal  title={this.state.modleTitle}
                            visible={this.state.visible}
                            onOk={this.handleSubmit}
                            onCancel={this.cancelModel}
                            >
                        <Form {...FormItemLayout} >
                            <FormItem label="姓名">
                            {getFieldDecorator('name',{
                                initialValue: name
                            })(
                            <Input placeholder='请输入姓名'/>
                        )}
                            </FormItem>
                            <FormItem label="性别">
                            {getFieldDecorator('sex',{
                                initialValue: sex
                            })(
                                <RadioGroup>
                                    <Radio value={0}>男</Radio>
                                    <Radio value={1}>女</Radio>
                                </RadioGroup>
                        )}
                            </FormItem>
                            <FormItem label="年龄">
                            {getFieldDecorator('age',{
                                initialValue: age
                            })(
                                <InputNumber min={18} max={99}/>
                        )}
                            </FormItem>
                            <FormItem label="就职公司">
                            {getFieldDecorator('company',{
                                initialValue: company
                            })(
                                <Input placeholder="请输入公司名称"/>
                        )}
                            </FormItem>
                            <FormItem label="薪资">
                            {getFieldDecorator('pay',{
                                initialValue: pay
                            })(
                                <Select>
                                    <Option value="18k">18k</Option>
                                    <Option value="19k">19k</Option>
                                    <Option value="20k">20k</Option>
                                    <Option value="21k">21k</Option>
                                </Select>
                        )}
                            </FormItem>
                        </Form>
                    </Modal>
                </TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane disabled tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        )
    }

    addRow = ()=> {
        this.setState({
            visible: true,
            modleTitle: '新增'
        })
    }
    cancelModel = () => {
        this.setState({
            visible: false,
            initialValue: {
                name: '刘德华',
                sex: 0,
                age: 18,
                company: '中国银行',
                pay: '18k'  
            }
        })
        this.props.form.resetFields();
    }

    handleSubmit = () => {
        let messageText= '新增成功！'
        let {dataSource, modleTitle, selectedKey} = this.state;
        let date = new Date().getTime();
        let {name, sex, age, company, pay} = this.props.form.getFieldsValue();
        let tableItem = {
                key: date,
                name,
                sex,
                age,
                company,
                pay
        }

        if(modleTitle === '修改'){
            for(let i=0;i< dataSource.length;i++){
                    if(dataSource[i].key === selectedKey){
                        dataSource[i].name =  name;
                        dataSource[i].sex =  sex;
                        dataSource[i].age =  age;
                        dataSource[i].company =  company;
                        dataSource[i].pay =  pay;
                    }
            }
            messageText = '修改成功';
            
        }else{
            dataSource.push(tableItem)
        }

        this.setState({
            dataSource,
            visible: false,
            initialValue: {
                name: '刘德华',
                sex: 0,
                age: 18,
                company: '中国银行',
                pay: '18k' 
            }
        }, ()=>{
                message.success(messageText);
                this.props.form.resetFields();
        })
    }

    deleteRow = (record)=> {
        Modal.confirm({
            title:'警告',
            icon: 'warning',
            content: `请确定要删除${record.name}的所有信息吗？`,
            okText: '删除',
            cancelText: '取消',
            onOk: ()=>{
                this.deleteItem(record)
            }
        })
        console.log(record, 190)
    }
    deleteItem = (record)=> {
            let dataSource = this.state.dataSource;
            dataSource = dataSource.filter(item=>item.key !==record.key);
            this.setState({
                dataSource
            }, ()=>{
                message.success('删除成功！')
            })
    }

    searchRow =()=> {
        let data = this.props.form.getFieldsValue();
        if(!data.searchName){
            return;
        }
        let dataSource = this.state.dataSource;
        dataSource = dataSource.filter(item=>item.name === data.searchName);
        this.setState({
            dataSource
        })
        this.props.form.resetFields();
    }

    changeItem= (record)=>{
        this.setState({
            visible: true,
            modleTitle: '修改'
        })
        let {
            name,
            sex,
            age,
            company,
            pay
        } = record;

        this.setState({
            initialValue: {
                name,
                sex,
                age,
                company,
                pay 
            },
            selectedKey: record.key
        })

    }
    resetData = ()=>{
        let data = [...cloneData]
        this.setState({
            dataSource: data
        })
    }
}
export default Form.create()(Tables)