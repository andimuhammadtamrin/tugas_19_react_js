import React,{Component} from 'react';
import axios from "axios";
import{
  Navbar,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup

}from "react-bootstrap";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      dataApi:[],
      edit:false,
      dataKaryawan:{
        id:0,
        nama_karyawan:"",
        jabatan:"",
        jenis_kelamin:"",
        tanggal_lahir:""
      }
    }
    this.handleRemove=this.handleRemove.bind(this);
    this.inputChange=this.inputChange.bind(this);
    this.onSubmitForm=this.onSubmitForm.bind(this);

  };

  reloadData(){
    axios.get('http://localhost:3004/data-karyawan').then(res =>{
      this.setState({
        dataApi:res.data,
        edit:false

      })
    });
  }


  handleRemove(e){
    console.log(e.target.value);
      fetch(`http://localhost:3004/data-karyawan/${e.target.value}`,{
         method:"DELETE"
      }).then(res => this.reloadData());
  }
  inputChange(e){
    let newdataKaryawan = {...this.state.dataKaryawan};
    if(this.state.edit===false){
      newdataKaryawan['id'] = new Date().getTime();
    }
    newdataKaryawan[e.target.name] = e.target.value;


    this.setState({
      dataKaryawan : newdataKaryawan
    },
    ()=>console.log(this.state.dataKaryawan)
    );
  }

  clearData = ()=>{
    let newdataKaryawan = {...this.state.dataKaryawan};

    newdataKaryawan['id']="";
    newdataKaryawan['nama_karyawan']="";
    newdataKaryawan['jabatan']="";
    newdataKaryawan['jenis_kelamin']="";
    newdataKaryawan['tanggal_lahir']="";

    this.setState({
      dataKaryawan : newdataKaryawan
    });
  }

  onSubmitForm=()=>{
    if(this.state.edit === false){
    axios.post('http://localhost:3004/data-karyawan',this.state.dataKaryawan)
    .then(()=>{
      this.reloadData();
      this.clearData();

    });
  }else{
    axios.put(`http://localhost:3004/data-karyawan/${this.state.dataKaryawan.id}`,this.state.dataKaryawan).then(()=>{
      this.reloadData();
      this.clearData();
    })
  }
  };

  getDataId=(e)=>{
    axios.get(`http://localhost:3004/data-karyawan/${e.target.value}`)
      .then(res=>{
        this.setState({
          dataKaryawan:res.data,
          edit : true
        })
      });

  }

componentDidMount(){
  // fetch('https://jsonplaceholder.typicode.com/posts')
  // .then(response => response.json())
  // .then(res => {
  //   this.setState({
  //     dataApi: res
  //   })
  // })
  this.reloadData();
}





  render(){
    return (
      <div>
        <Navbar style={{backgroundColor:"yellow"}}>
          <Navbar.Brand style={{alignText:"center"}}>
            <img
              src="https://pngimage.net/wp-content/uploads/2018/06/icon-karyawan-png-3.png"
              width="150"
              height="80"
              className="d-inline-block align-top"
              alt ="gambar"
            />

          </Navbar.Brand>
          <h1 style={{color:"white"}}>Data Karyawan</h1>
        </Navbar>
        <br />
        <Row>
        <Col xs={2}></Col>
        <Col xs={9}>
          <Form>
            <Form.Row>
              <Col>
                <Form.Control
                  type="text"
                  name="nama_karyawan"
                  value={this.state.dataKaryawan.nama_karyawan}
                  placeholder="Nama Karyawan"
                  onChange={this.inputChange}

                />
              </Col>
              <Col>
                <Form.Control
                type="text"
                name="jabatan"
                value={this.state.dataKaryawan.jabatan}
                placeholder="Jabatan"
                onChange={this.inputChange}
                />
              </Col>

              <Col>
                <Form.Control
                 type="text"
                 name="jenis_kelamin"
                 value={this.state.dataKaryawan.jenis_kelamin}
                 placeholder="Jenis Kelamin"
                 onChange={this.inputChange}
                />
              </Col>

              <Col>
                <Form.Control
                name="tanggal_lahir"
                value={this.state.dataKaryawan.tanggal_lahir}
                type="date"
                onChange={this.inputChange}
                />
              </Col>

              <Col>
                <Button
                  style={{paddingleft:"20px"}}
                  variant="primary"
                  onClick={this.onSubmitForm}
                >
                  Save Data
                </Button>
              </Col>
            </Form.Row>
          </Form>
          <br />
          <Row>
          <Col xs={2}></Col>
          <Col xs={6}>
            {this.state.dataApi.map((dat,index)=>
            {
                return(
                  <div key={index}>


                      <Card border="info" text="black" style={{width:'500px'}}>
                      <Card.Body>
                        <ListGroup>
                        <Card.Text>
                          Nama : {dat.nama_karyawan}
                          <br/><br/>
                          Jabatan : {dat.jabatan}
                          <br/><br/>
                          Jenis Kelamin : {dat.jenis_kelamin}
                          <br /><br/>
                          Tanggal Lahir : {dat.tanggal_lahir}
                        </Card.Text>
                        </ListGroup>
                          <br/><br/>
                        <ListGroup>

                            <Button value={dat.id} onClick={this.handleRemove} variant="danger">Delete</Button>

                        </ListGroup>
                        <br/>
                        <ListGroup>

                            <Button variant="success" value={dat.id} onClick={this.getDataId}>Edit Data</Button>

                        </ListGroup>


                      </Card.Body>
                      </Card>
                      <br/>

                  </div>);

            })}
            <br />
          </Col>
          <Col></Col>
          </Row>
        </Col>
        <Col></Col>
        </Row>

      </div>
    );
  }
}

export default App;
