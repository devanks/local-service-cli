const express = require('express');
const shell = require('shelljs');
const axios = require('axios').default;;
const router = express.Router();
const healthResources = require('../resources/health/health-resources.json');

const healthResponse = {'health':'up', 'components': {}};


// Object.keys(healthResources)
//     .forEach(service => {
//         router.get(`/${service}`, )
//     });

function fillHealthResources() {
    return Promise.allSettled(Object.keys(healthResources)
        .map(service => {
            if (healthResources[service].health.type === "api") {
                return axios.get(healthResources[service].health.endpoint)
                    .then((res) => {
                        healthResponse.components[service] = res.data
                    })
                    .catch(error => {
                        healthResponse.components[service] = {
                            'health': 'down',
                            // 'details': error
                        }
                    })
            }
            return Promise.resolve();
        }));
}

router.get('/', (req, res) => {

    fillHealthResources()
        .then(() => {
            res.status(200)
                .send(healthResponse);
        })

})

router.get('/ifm-vfmt-service', (req, res) => {
    const service = 'ifm-vfmt-service';
    return axios.get(healthResources[service].health.endpoint)
        .then((ressponse) => {
            return res.data;
        })
        .catch(error => {
            return  {
                service: {
                    'health': 'down',
                    'error': error
                }
            }
        })

})

module.exports = router;

