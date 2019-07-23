import React from 'react';
import {Link, graphql, useStaticQuery} from 'gatsby';

class CasesLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: undefined,
            cases:this.props.cases,
            sections:[{id:'all', name: 'All',},...this.props.sections],


        }
    }


    filter = (e) =>{
        if (e.target.innerHTML !== 'All'){
            let filteredCases = [];
            this.state.cases.forEach(e2 => {
                if(e.target.innerHTML === e2.sections.name){
                    filteredCases.push(e2)
                }

            });
            this.setState({
                filtered:filteredCases
            })
        }else{
            this.setState({
                filtered:this.props.cases
            })
        }



    };
    render() {
        return(
            <div>
                <div className="sectionsLinks">
                    {this.state.sections.map((section) => (
                        <div key={section.id}>
                            <Link to={"/cases"} onClick={this.filter}><span>{section.name}</span></Link>
                        </div>
                    ))}
                </div>


                <div className = "cases">
                    {this.state.filtered === undefined ? this.state.cases.map((wpCase,index) => (
                        <Link to={wpCase.path} key={index}>
                            <img src={wpCase.thumbnail_image.url}/>
                            <div className = "cases-card">
                                <span>{wpCase.title}</span>
                                <span>{wpCase.technologies.name}</span>
                                <span>{wpCase.sections.name}</span>
                            </div>
                        </Link>
                    )):this.state.filtered.map((wpCase,index) => (
                        <Link to={wpCase.path} key={index}>
                            <img src={wpCase.thumbnail_image.url}/>
                            <div className = "cases-card">
                                <span>{wpCase.title}</span>
                                <span>{wpCase.technologies.name}</span>
                                <span>{wpCase.sections.name}</span>
                            </div>
                        </Link>
                    ))
                    }

                </div>
            </div>

        )
    }

}
export default CasesLinks
