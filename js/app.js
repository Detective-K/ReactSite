const checkXun =  (e) =>{
                     let xun ;
                     if(e <= 10)
                     {
                       xun = 1;
                     }
                     else if(e >=11 && e <=20 )
                     {
                      xun = 2;
                     }
                     else
                     {
                      xun = 3;
                     }
                     return xun;
                    };
class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            yy : '',
            mm : '',
            xun : '',
            items: []
        };
    }   
   
    componentDidMount() {
                const cors = 'https://cors-anywhere.herokuapp.com/';
                const url = 'http://portal.sw.nat.gov.tw/APGQ/GC331!downLoad?formBean.downLoadFile=CURRENT_JSON';

                fetch(`${cors}${url}`, {
                    method: 'GET'
                }).then(res => {
                    return res.json();
                }).then(result => {
                    this.setState({
                        isLoaded: true,
                        yy : String(parseInt(result.start.substr(0,4))-1911),
                        mm : result.start.substr(4,2),
                        xun : checkXun(parseInt(result.start.substr(6))),
                        items: result.items
                      });

                });
    }

    render() {
      const { isLoaded , yy , mm , xun, items } = this.state;
      const colNames = ["幣別" , "年" , "月" , "旬" ,"買進" , "賣出" ];
        if (this.state.liked && items.length >0) {
            return  (
           <table id = 'customers' >
            <thead> 
                <tr>
                 {colNames.map((colName , index) =>(<th key={index}>{colName}</th>))}
                 </tr>
                 </thead>
                <tbody> 
              { items.length> 0 ?items.map((item , index) => (
                <tr key={index}><td>{item.code}</td><td>{yy}</td><td>{mm}</td><td>{xun}</td><td>{item.buyValue}</td><td>{item.sellValue}</td></tr>
              )): <tr></tr> }
              </tbody> 
            </table>
            );
        }

           return (<button onClick={() => this.setState({ liked: true})}>Like </button>);
    }
}

ReactDOM.render(<LikeButton />, document.getElementById('main'));