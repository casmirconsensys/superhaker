import styles from './AddToken.module.css'
import { useSelector } from 'react-redux'
import altStyle from '../../sections/suggestions/Suggestions.module.css'

const AddToken = () => {

  const name = useSelector(state => state.user.name)

    return (
        <button type='button' className={`btn ${styles.btnAddToken}`}>
        <div className={styles.addIconContainer}>
          <div className='icon-plus' style={{width: '24px', height:'24px'}}/>
        </div>
        <div className={styles.btnAddTokenTextContainer}>
          <p className={altStyle.trackTitle}>Add your token</p>
          <p className={altStyle.trackArtist}>{name}</p>
        </div>
        <div className='icon-arrow-right-alternate' style={{width: '24px', height:'24px'}}/>
      </button>
    )
}

export default AddToken
