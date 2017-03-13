/**
 * Repository for all mulesoft api's consumed
 */

var cred = {
    user: atob('Qmlza0FwaUludGVncmF0aW9ucw=='),
    pass: atob('RzBAcHBsZUcwIQ=='),
    base: function () {
        return 'Basic ' + btoa(this.user + ':' + this.pass)
    }
}

function btoa(str) {
    return new Buffer(str).toString('base64');
};

function atob(b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString();
};

//https://programinfo.cloudhub.io/api/courses?poi=

var dev = {
    endpoints: {
        programInfo: {
            headers: {
                client_id: 'fad0ce9b605d46b1827f65ed79903013',
                client_secret: 'c29beb2f877c4e8aA525F3279FC189BC'
            },
            url: 'http://program-info-dev.cloudhub.io/api/poi',
            query: {
                institutionId: ''
            }
        },
        getStudentStatus: {
            client_id: '',
            client_secret: '',
            url: ''
        },
        addLead: {
            headers: {
                Authorization: cred.base()
            },
            url: 'https://sf-add-lead-api-dev.cloudhub.io/'
        },
        getInstitutions: {
            headers: {
                Authorization: cred.base()
            },
            url: 'https://api-sf-getpoi-dev.cloudhub.io/GetInstitutions'
        },
        getTCPA: {
            client_id: '',
            client_secret: '',
            url: ''
        },
        getSalesForcePois: {
            headers: {
                Authorization: cred.base()
            },
            url: "https://api-sf-getpoi-dev.cloudhub.io",
            data: {
                institutionId: ''
            }
        }
    }
}
var qa = {
    endpoints: {
        programInfo: {
            headers: {
                client_id: '',
                client_secret: ''
            },
            url: '',
            query: []
        },
        getStudentStatus: {
            headers: {
                Authorization: cred.base()
            },
            url: 'https://api-check-student-qa.cloudhub.io/getstudent_status',
            query: ['email', 'domainid']
        },
        addLead: {
            client_id: '',
            client_secret: '',
            url: ''
        },
        getInstitutions: {
            headers: {
                Authorization: cred.base()
            },
            url: 'https://api-sf-getpoi-qa.cloudhub.io/GetInstitutions'
        },
        getTCPA: {
            client_id: '',
            client_secret: '',
            url: ''
        },
        getSalesForcePois: {
            headers: {
                Authorization: cred.base()
            },
            url: "https://api-sf-getpoi-qa.cloudhub.io",
            data: {
                institutionId: ''
            }
        }
    }
}
var uat = {
    endpoints: {
        programInfo: {
            headers: {
                client_id: '78b878ed13ff4f0bb8381a7c6eb42ddb',
                client_secret: 'a417111f1bab4076896D132985EFA353'
            },
            url: 'https://programinfo-uat.cloudhub.io/api/poi',
            query: {
                institutionId: ''
            }
        },
        getStudentStatus: {
            headers: {
                Authorization: cred.base()
            },
            url: 'https://api-check-student-uat.cloudhub.io/getstudent_status',
            query: ['email', 'domainid']
        },
        addLead: {
            headers: {
                Authorization: cred.base()
            },
            url: 'https://sf-add-lead-api-uat.cloudhub.io/'
        },
        getInstitutions: {
            headers: {
                Authorization: cred.base()
            },
            url: 'https://api-sf-getpoi-uat.cloudhub.io/GetInstitutions'
        },
        getTCPA: {
            client_id: '',
            client_secret: '',
            url: ''
        },
        getSalesForcePois: {
            headers: {
                Authorization: cred.base()
            },
            url: "https://api-sf-getpoi-uat.cloudhub.io",
            data: {
                institutionId: ''
            }
        }
    }
}
var prod = {
    endpoints: {
        programInfo: {
            headers: {
                client_id: '983ed65559a346449b33551e6d9606fb',
                client_secret: '634c11eb8e174c70884F7EE4E13A996C'
            },
            url: 'https://programinfo.cloudhub.io/api/poi',
            query: {
                institutionId: ''
            }
        },
        getStudentStatus: {
            headers: {
                Authorization: cred.base()
            },
            url: 'https://api-check-student.cloudhub.io/getstudent_status',
            query: {
                email: '',
                domainid: ''
            }
        },
        addLead: {
            headers: {
                Authorization: cred.base()
            },
            url: 'https://sf-add-lead-api.cloudhub.io/'
        },
        getInstitutions: {
            headers: {
                Authorization: cred.base()
            },
            url: 'https://api-sf-getpoi.cloudhub.io/GetInstitutions'
        },
        getTCPA: {
            client_id: '',
            client_secret: '',
            url: ''
        },
        getSalesForcePois: {
            method: "POST",
            headers: {
                Authorization: cred.base()
            },
            url: "https://api-sf-getpoi.cloudhub.io",
            data: {
                institutionId: ''
            }
        }
    }
}
var Legacy_Institution_ID__c = [{
        university: 'University of St. Thomas',
        id: 'UC112',
        sfid: '0016100000TWYsUAAX'
    },
    {
        university: 'University of Notre Dame',
        id: 'UC109',
        sfid: '0016100000TWYsVAAX'
    },
    {
        university: 'Michigan State University',
        id: 'UC105',
        sfid: '0016100000TWYsWAAX'
    },
    {
        university: 'Villanova University',
        id: 'UC115',
        sfid: '0016100000TWYsXAAX'
    },
    {
        university: 'New England College',
        id: 'UC106',
        sfid: '0016100000TWYsYAAX'
    },
    {
        university: 'Florida Institute of Technology',
        id: 'UC102',
        sfid: '0016100000TWYsZAAX'
    },
    {
        university: 'Valparaiso University',
        id: 'UC112',
        sfid: '0016100000TWYsaAAH'
    },
    {
        university: 'Jacksonville University',
        id: 'UC104',
        sfid: '0016100000TWYsbAAH'
    },
    {
        university: 'University of Vermont',
        id: 'UC113',
        sfid: '0016100000TWYs3AAH'
    },
    {
        university: 'University of South Florida',
        id: 'UC111',
        sfid: '0016100000TWZ9tAAH'
    },
    {
        university: 'Interactive Advertising Bureau',
        id: 'UC103',
        sfid: '0016100000TWZ9uAAH'
    },
    {
        university: 'Dominican University',
        id: 'UC101',
        sfid: '0016100000TWZ9vAAH'
    },
    {
        university: 'American Dental Association',
        id: 'UC100',
        sfid: '0016100000TWZ9wAAH'
    },
    {
        university: 'University of Florida',
        id: 'UC108',
        sfid: '0016100000TWZ9xAAH'
    },
    {
        university: 'University Alliance Continuing Education (UACE)',
        id: 'UC116',
        sfid: '0016100000TWZ9yAAH'
    },
    {
        university: 'University of San Francisco',
        id: 'UC110',
        sfid: '0016100000TWZ9zAAH'
    },
    {
        university: 'The University of Scranton',
        id: 'UC107',
        sfid: '0016100000TWZA0AAP'
    }
]

module.exports = function () {
    this.dev = dev,
    this.qa = qa,
    this.uat = uat,
    this.prod = prod
    this.legacy = Legacy_Institution_ID__c
    return this;
}