import './App.css'
import AdminTable from './components/AdminTable/AdminTable'
import styles from './App.module.css'

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <h1>Admin</h1>
      <h3>Version 1.0</h3>
      <AdminTable />
    </div>
  )
}

export default App
