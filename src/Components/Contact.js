  
import React, { Component } from 'react';
import axios from 'axios';

class Contact extends Component {

   constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        message: ''
      }
     }
   
     handleSubmit(e){
       e.preventDefault();
       axios({
         method: "POST", 
         url:"https://hostingmyserver.herokuapp.com/send", 
         // hosting need to be changed
         data:  this.state
       }).then((response)=>{
         if (response.data.status === 'success'){
           alert("Message Sent."); 
           this.resetForm()
         }else if(response.data.status === 'fail'){
           alert("Message failed to send.")
         }
       })
     }
   
     resetForm(){
       
        this.setState({name: "", email: "", message: ""})
     }

     onNameChange(event) {
      this.setState({name: event.target.value})
     }
   
     onEmailChange(event) {
      this.setState({email: event.target.value})
     }
   
     onMessageChange(event) {
      this.setState({message: event.target.value})
     }


  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      // var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">

               <form id="contactForm" onSubmit={this.handleSubmit.bind(this)} method="POST">
                  <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                  </div>
                  <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                  </div>
                  <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
               </form>

               <div id="message-warning"> Error boy</div>
                     <div id="message-success">
                        <i className="fa fa-check"></i>Your message was sent, thank you!<br />
                     </div>
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Address and Phone</h4>
					   <p className="address">
						   {name}<br />
						   {street} <br />
						   {city}, {state} {zip}<br />
						   <span>{phone}</span>
					   </p>
				   </div>
            </aside>
      </div>
   </section>
    );
  }
}

export default Contact;
