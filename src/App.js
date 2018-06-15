import React, { Component } from 'react';
import './assets/sass/styles.css';
import LineChart from 'react-svg-line-chart';

const accessToken = "PasteYourTokenHere";

// define crypto vars
var data = [
  {
    repo: 'bitcoin/bitcoin',
    abbr: 'BTC'
  },
  {
    repo: 'ethereum/go-ethereum',
    abbr: 'ETH'
  },
  {
    repo: 'ripple/rippled',
    abbr: 'XRP'
  },
  {
    repo: 'bitcoincashorg/spec',
    abbr: 'BCH'
  },
  {
    repo: 'EOSIO/eos',
    abbr: 'EOS'
  },
  {
    repo: 'litecoin-project/litecoin',
    abbr: 'LTC'
  }
];

class Repos extends Component {
  constructor(props) {
    super(props);

    // Pull repo info from GitHub API and set states
    fetch('https://api.github.com/repos/'+this.props.repo+'?access_token='+accessToken)
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data);
      this.setState({
        name: data.name,
        desc: data.description,
        image: data.organization ? (data.organization.avatar_url) : null,
        language: data.language ? (data.language) : "NA",
        issues: data.open_issues_count.toLocaleString(data.open_issues_count, { minimumFractionDigits: 0 }),
        forks: data.forks_count.toLocaleString(data.forks_count, { minimumFractionDigits: 0 }),
        homepage: data.homepage,
      });
    });

    // retrieve close prices of each crypto for the past 30 days
    fetch('https://min-api.cryptocompare.com/data/histoday?fsym='+this.props.abbr+'&tsym=USD&limit=30')
    .then(results => {
      return results.json();
    }).then(data => {
      var points = [];
      for (let i = 0; i < 30; i++) {
        points.push( {x: i, y: data.Data[i].close })
      }
      this.setState({
        points: points
      });
    });

  }
  render(points) {
    return( 
      <div>
        
        <section className="card">

          <LineChart
            data={this.state.points}
            axisVisible={false}
            gridVisible={false}
            labelsVisible={false}
            labelsCountY={1}
            pathColor="rgba(255,255,255,0.25)"
            pathVisible={true}
            pathSmoothing={0.1}
            pointsVisible={false}
          />

          <div className="cardCopy">

            <article className="intro">
              {this.state.image ? (
                  <img src={this.state.image} alt="" className="image" />
                ) : (<span className="defaultImage"></span>) 
              }
              <div>
                <h3 className="name">{this.state.name}</h3>
                <p className="desc">{this.state.desc}</p>
              </div>
            </article>

            <a className="homepage" href={this.state.homepage} target="_Blank">View Website</a>
            
            <div className="metrics">
              <article>
                {this.state.language}
                <span>Language</span>
              </article>
              <article>
                {this.state.issues}
                <span>Open Issues</span>
              </article>
              <article>
                {this.state.forks}
                <span>Forks</span>
              </article>
            </div>

          </div>

        </section>
      
      </div>
    )
  }
};

const repoListing = () => (
  <section id="wrap">
    {data.map((item, index) => (
      <Repos
        key={index}
        repo={item.repo}
        abbr={item.abbr}
      />
    ))}
  </section>
);

export default repoListing;
