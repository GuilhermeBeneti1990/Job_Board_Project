import { GraphQLError } from 'graphql';
import { getJobs, getJob, getJobsByCompany, createJob, deleteJob, updateJob } from '../db/jobs.js'
import { getCompany } from '../db/companies.js'

export const resolvers = {
    Query: {
        jobs: async () => getJobs(),

        job: async (_, { id }) => {
            const job = getJob(id);

            if(!job) {
                throw notFoundError('Not found any job with id: ', id);
            }

            return job;
        },

        company: async (_, { id }) => {
            const company = await getCompany(id);
            
            if(!company) {
                throw notFoundError('Not found any company with id: ', id);
            }

            return company;
        }
    },

    Mutation: {
        createJob: (_, { input: { title, description } }) => {
            const companyId = 'FcxJkALei';
            return createJob({ companyId, title, description });
        },
        updateJob: (_, { input: { id, title, description }}) => {
            return updateJob({ id, title, description });
        },
        deleteJob: (_, { id }) => deleteJob(id)
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id)
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


function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: { code: ' NOT_FOUND'}
    });
}