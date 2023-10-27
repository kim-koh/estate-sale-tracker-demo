import Styles from "../../styles/SaleHeader.module.css"

function SaleHeader() {
    return(
        <div className="header-container">
            <div className='header-text'>
                <h1>Cursed Estate Sale</h1>
                <p className={Styles.info}><b>Where:</b></p>
                <p className={Styles.info}>Blackwell Lane</p>
                <p className={Styles.info}><b>When:</b></p>
                <p className={Styles.info}> Saturday, October 7 9am-6pm </p>
                <p className={Styles.info}>Sunday, October 15 9am - 6pm</p> 
            </div>
        </div>
    )
}

export default SaleHeader;