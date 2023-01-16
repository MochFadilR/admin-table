import ProjectRow from '../ProjectRow/ProjectRow'
import styles from './adminTable.module.css'
import companyData from '../../data/company_data'
import projectData from '../../data/project_data'

const AdminTable: React.FC = () => {
  const adminCategories = companyData.adminCategories
  const projects = projectData.results

  return (
    <table className={styles['admin-table']}>
      <thead>
        <tr>
          <th></th>
          {adminCategories.map(
            (adminCategory: typeof companyData['adminCategories'][0]) => (
              <th>{adminCategory.title}</th>
            )
          )}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project: typeof projectData['results'][0], index) => (
          <ProjectRow key={index} project={project} />
        ))}
      </tbody>
    </table>
  )
}

export default AdminTable
