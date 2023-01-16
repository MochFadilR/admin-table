import PermitCard from '../PermitCard/PermitCard'
import styles from './ProjectRow.module.css'
import projectData from '../../data/project_data'
import companyData from '../../data/company_data'
import { useState, useEffect } from 'react'

interface ProjectRowProps {
  project: typeof projectData['results'][0]
}

const categoryLength = companyData.adminCategories.length
const columnArray = Array(categoryLength + 2).fill(' ')

const ProjectRow: React.FC<ProjectRowProps> = ({ project }) => {
  const [columns, setColumns] = useState(columnArray)

  const permits = project.permits

  const getAdminCategories = (permit_type: string) => {
    switch (permit_type) {
      case '51862831-230a-4ea4-a9aa-3ff10725ca2a':
        return 0
      case '9f42279e-562d-48d4-96bc-3b7775976fb1':
        return 1
      case 'f08548c5-b1df-4118-a0a7-f261151200ac':
        return 2
      case 'bc6aecaa-0603-4ba5-8ca7-716bc5eb32c8':
        return 3
      case '01106568-bc71-4efc-9f70-70d84610fdf7':
        return 4
      case '299d7521-da78-4e24-ad96-82deab1a5813':
        return 5
      case '0e720c11-3b79-4b40-b563-5f22c03a4cb5':
        return 6
      case 'a7c6546e-540c-4edc-9e0e-d62491b6cb01':
        return 7
      case 'cda06e7b-0356-433a-b098-252b165ec607':
        return 8
    }
  }

  useEffect(() => {
    permits.forEach((permit) => {
      const columnIndex: number | undefined = getAdminCategories(
        permit.permit_type
      )
      if (columnIndex !== undefined) {
        setColumns((prevColumnArray) => {
          const updatedColumnArray = [...prevColumnArray]
          updatedColumnArray[columnIndex] = <PermitCard permit={permit} />
          return updatedColumnArray
        })
      }
    })
    return () => {
      setColumns(columnArray)
    }
  }, [permits])

  return (
    <tr className={styles['table-row']}>
      <td>{project.siteAddress}</td>
      {columns.map((column, index) => (
        <td key={index}>{column}</td>
      ))}
    </tr>
  )
}

export default ProjectRow
