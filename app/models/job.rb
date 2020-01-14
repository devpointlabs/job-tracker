class Job < ApplicationRecord
  belongs_to :user

  has_many :notes, dependent: :destroy
  has_many :tasks, dependent: :destroy
  has_many :interviews, dependent: :destroy
  has_many :contacts, dependent: :destroy

  # function to calculate tasks due within a certain timeframe
  def self.tasks_due(id, dueDate)
    # binding.pry
    find_by_sql(["
      SELECT due_date, subject, company_name, job_title, status, user_id
      FROM jobs 
      LEFT JOIN tasks ON 
        tasks.job_id = jobs.id 
      WHERE (due_date >= CURRENT_DATE AND due_date <= CURRENT_DATE + interval '? day')
        AND completed_date IS NULL
        AND due_date IS NOT NULL
        AND user_id = ?
    ", dueDate.to_i, id])
  end
end
