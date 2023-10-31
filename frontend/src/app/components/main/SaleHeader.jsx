import styles from "../../styles/SaleHeader.module.css"

function SaleHeader() {
    return(
        <div className={styles.headerContainer}>
            <div className={styles.headerText}>
                <h1>[DEMO] Yard or Bake Sale</h1>
                <p className={styles.info}><b>Where:</b></p>
                <p className={styles.info}>123 Apple Lane</p>
                <p className={styles.info}><b>When:</b></p>
                <p className={styles.info}>Wednesday, June 5 8am-5pm </p>
                <p className={styles.info}>Thursday, June 6 8am-5pm </p>
                <p className={styles.info}>Friday, June 7 8am-4pm</p>
            </div>
        </div>
    )
}

export default SaleHeader;