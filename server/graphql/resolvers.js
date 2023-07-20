import { getJobs } from '../db/jobs.js'
import {  getCompany } from '../db/companies.js'

export const resolvers = {
    Query: {
        jobs: async () => getJobs(),
    },

    Job: {
        company: (job) => {
            return getCompany(job.companyId);
        },
        date: (job) => {
            return job.createdAt;
        }
    }
}