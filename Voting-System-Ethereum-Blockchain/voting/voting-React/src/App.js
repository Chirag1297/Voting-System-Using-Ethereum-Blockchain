import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import voting from './voting';
import hex2string from './hextostring.js';
const initCandidate = ["0x434f4e4752455353000000000000000000000000000000000000000000000000", //congress
                     "0x4248415254495941204a414e5441205041525459000000000000000000000000", //bjp
                     "0x41414d204141444d492050415254590000000000000000000000000000000000", //aap
                     "0x4e4f544100000000000000000000000000000000000000000000000000000000" //nota
                    ]; 

class App extends Component {
  state = {
    winner: '',
    message: '',
    vote: '',
    votesfor1: '',
    votesfor2: '',
    votesfor3: '',
    votesfor4: ''
  };

  async componentDidMount() {
    console.log(voting.options.address);
    const votesfor1 = await voting.methods.totalvotesfor(initCandidate[0]).call();
    const votesfor2 = await voting.methods.totalvotesfor(initCandidate[1]).call();
    const votesfor3 = await voting.methods.totalvotesfor(initCandidate[2]).call();
    const votesfor4 = await voting.methods.totalvotesfor(initCandidate[3]).call();
    this.setState({votesfor1});
    this.setState({votesfor2});
    this.setState({votesfor3});
    this.setState({votesfor4});
  }

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log('account is: ',accounts[0]);
    this.setState({ message: 'Waiting on transaction success...' });

    if(this.state.vote==="CONGRESS")
    {
      await voting.methods.voteforcandidate(initCandidate[0]).send({ 
        from: accounts[0], 
        gas: '1000000' });
		  this.setState({ message: 'Thank you for voting!' });
    }
    else 
    {
      if(this.state.vote==="BJP")
      {
        await voting.methods.voteforcandidate(initCandidate[1]).send({ 
        from: accounts[0], 
        gas: '1000000' });
		    this.setState({ message: 'Thank you for voting!' });
      }
      else 
      {
        if(this.state.vote==="AAP")
        {
          await voting.methods.voteforcandidate(initCandidate[2]).send({ 
          from: accounts[0], 
          gas: '1000000' });
          this.setState({ message: 'Thank you for voting!' });
        }
        else 
        {
          if(this.state.vote==="NOTA")
          {
            await voting.methods.voteforcandidate(initCandidate[3]).send({ 
            from: accounts[0], 
            gas: '1000000' });
            this.setState({ message: 'Thank you for voting!' });
          }
          else 
          {
            this.setState({ message: 'INVALID ENTRY' });
          }   
        }
	     }
	    }
  };
  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    const winner1 = await voting.methods.getWinner().call();
    const winner = hex2string(winner1);
    this.setState({winner});
    this.setState({votesfor1: ''});
    this.setState({votesfor2: ''});
    this.setState({votesfor3: ''});
    this.setState({votesfor4: ''});
  };

  render() {
    return (
      <div className='header' >
        <h2 id="headline">Decentralized Voting App</h2>
        <p id="text">
         There are currently{' '}
          {3} candidates/political parties entered.
        </p>

        <hr />
        <div className='column'>
          <img src="http://www.trueopinion.co.in/wp-content/uploads/2017/03/27326e62bf6e213093d5b65c9b5efd61_indian-national-congress-logo-congress-logo-clip-art_992-1600.jpeg" 
                style={{ width: 400 , height: 350, float: 'left', top: this.props.top, left: this.props.left}}
                alt-text="congress"
                />
			<b>CONGRESS</b>
        </div>
        <div className='column' >
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Bharatiya_Janata_Party_%28icon%29.jpg" 
          style={{ width: 400, height: 350, float: 'left', top: this.props.top, left: this.props.left}}
          alt-text="bjp"/>
		  <b font-size="1px">BJP</b>
        </div>
        <div className='column' >
          <img src="https://www.hindustantimes.com/rf/image_size_640x362/HT/p1/2014/02/27/Incoming/Pictures/1188878_Wallpaper2.jpg" 
            style={{width: 400, height: 350, float: 'left', top: this.props.top, left: this.props.left}}
            alt-text="aap" />
			<b>AAM AADMI PARTY</b>
        </div>
		<br />
        <form onSubmit={this.onSubmit} style={{paddingTop:'450px'}} >
		<h4 style={{color:'red'}}>Type the Political Party's Name</h4>
          <div>
            <input className="inpu"
              value={this.state.vote}
              onChange={ event => this.setState({ vote: event.target.value })}
            />
          </div>
        </form>
        <h2>{this.state.message}</h2>
        <hr />
        <h2>CONGRESS: {this.state.votesfor1} </h2>
        <hr />
        <h2>BHARTIYA JANTA PARTY: {this.state.votesfor2} </h2>
        <hr />
        <h2>AAM AADMI PARTY: {this.state.votesfor3} </h2>
        <hr />
        <h2>NONE OF THE ABOVE(NOTA): {this.state.votesfor4} </h2>
		<hr />
        <button className="Button" onClick={this.onClick}><b>END VOTING</b></button>
        <h2>The winner: {this.state.winner}</h2>
      </div>
        );
    }
}

export default App;
