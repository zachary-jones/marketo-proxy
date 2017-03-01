var cred = {
    user: atob('Qmlza0FwaUludGVncmF0aW9ucw=='),
    pass: atob('RzBAcHBsZUcwIQ=='),
    base: function() {
        return 'Basic ' + btoa(this.user + ':' + this.pass)
    }
}

function btoa(str) {return new Buffer(str).toString('base64');};
function atob(b64Encoded) {return new Buffer(b64Encoded, 'base64').toString();};

var dev = {
    endpoints: {
        programInfo: {
            headers: {
                client_id: 'fad0ce9b605d46b1827f65ed79903013', 
                client_secret: 'c29beb2f877c4e8aA525F3279FC189BC'
            },
            url: 'http://program-info-dev.cloudhub.io/api/poi', 
            query: {
                institutionid: ''
            }
        },
        getStudentStatus: {
            client_id: '', client_secret: '', url: ''
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
            client_id: '', client_secret: '', url: ''
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
            client_id: '', client_secret: '', url: ''
        },
        getInstitutions: {
            headers: {
                Authorization: cred.base()
            },
            url: 'https://api-sf-getpoi-qa.cloudhub.io/GetInstitutions'
        },
        getTCPA: {
            client_id: '', client_secret: '', url: ''
        }
    }
}

var staging = {
    endpoints: {
        programInfo: {
            headers: {
                client_id: '', 
                client_secret: ''
            }, 
            url: 'https://programinfo-uat.cloudhub.io/api/poi', 
            query: {
                institutionid:''
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
            client_id: '', client_secret: '', url: ''
        }
    }
}
var prod = {
    endpoints: {
        programInfo: {
            headers: {
                client_id: '7c1eaa2a787547358f6f729be4cd0d6c', 
                client_secret: 'f09f0f39476d4765BD3382C01FFD389D'
            },             
            url: 'https://programinfo.cloudhub.io/api/poi', 
            query: {
                institutionid: ''
            }
        },
        getStudentStatus: { 
            headers: {
                Authorization: cred.base()
            },
            url: 'https://api-check-student.cloudhub.io/getstudent_status',
            query: {
                email: '', domainid: ''
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
            client_id: '', client_secret: '', url: ''
        }
    },
    sfInstitutions: [
        { university: 'NewEnglandCollege', id: 'UC106' }
    ]
}

module.exports = function(){
        this.dev = dev,
        this.qa = qa,
        this.staging = staging,
        this.prod = prod
    return this;
}