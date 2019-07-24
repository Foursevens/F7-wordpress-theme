import React from 'react';
import {Link} from 'gatsby';
import Cases from './CasesC'
class CasesLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cases:this.props.cases,
            sections:[{id:'all', name: 'All',},...this.props.sections],
            filter:'All',


        }
    }
    filter = (e) => {
        const filter = e.target.innerHTML;
        return this.setState({
            filter:filter
        })
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
                <Cases filter={this.state.filter} cases={this.state.cases}/>
            </div>

        )
    }

}
export default CasesLinks
