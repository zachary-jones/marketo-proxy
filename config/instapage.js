/**
 * Returns standard options used on landing pages so that our users need not implement these manually. Also provides a single source of truth
 */

var options = {
    standardOptions: {
        militaryRelationship: {
            options: [{
                    display: 'Military Relationship: None',
                    value: 'None'
                },
                {
                    display: 'Dependent',
                    value: 'Dependent'
                },
                {
                    display: 'Servicemember',
                    value: 'Servicemember'
                },
                {
                    display: 'Spouse of Servicemember',
                    value: 'Spouse of Servicemember'
                },
                {
                    display: 'Veteran',
                    value: 'Veteran'
                }
            ]
        },
        countries: {
            options: [
                {
                    display: 'United States',
                    value: 'United States'
                },
                {
                    display: 'United Kingdom',
                    value: 'United Kingdom'
                },
                {
                    display: 'Afghanistan',
                    value: 'Afghanistan'
                },
                {
                    display: 'Albania',
                    value: 'Albania'
                },
                {
                    display: 'Algeria',
                    value: 'Algeria'
                },
                {
                    display: 'American Samoa',
                    value: 'American Samoa'
                },
                {
                    display: 'Andorra',
                    value: 'Andorra'
                },
                {
                    display: 'Angola',
                    value: 'Angola'
                },
                {
                    display: 'Anguilla',
                    value: 'Anguilla'
                },
                {
                    display: 'Antarctica',
                    value: 'Antarctica'
                },
                {
                    display: 'Antigua and Barbuda',
                    value: 'Antigua and Barbuda'
                },
                {
                    display: 'Argentina',
                    value: 'Argentina'
                },
                {
                    display: 'Armenia',
                    value: 'Armenia'
                },
                {
                    display: 'Aruba',
                    value: 'Aruba'
                },
                {
                    display: 'Australia',
                    value: 'Australia'
                },
                {
                    display: 'Austria',
                    value: 'Austria'
                },
                {
                    display: 'Azerbaijan',
                    value: 'Azerbaijan'
                },
                {
                    display: 'Bahamas',
                    value: 'Bahamas'
                },
                {
                    display: 'Bahrain',
                    value: 'Bahrain'
                },
                {
                    display: 'Bangladesh',
                    value: 'Bangladesh'
                },
                {
                    display: 'Barbados',
                    value: 'Barbados'
                },
                {
                    display: 'Belarus',
                    value: 'Belarus'
                },
                {
                    display: 'Belgium',
                    value: 'Belgium'
                },
                {
                    display: 'Belize',
                    value: 'Belize'
                },
                {
                    display: 'Benin',
                    value: 'Benin'
                },
                {
                    display: 'Bermuda',
                    value: 'Bermuda'
                },
                {
                    display: 'Bhutan',
                    value: 'Bhutan'
                },
                {
                    display: 'Bolivia',
                    value: 'Bolivia'
                },
                {
                    display: 'Bosnia and Herzegovina',
                    value: 'Bosnia and Herzegovina'
                },
                {
                    display: 'Botswana',
                    value: 'Botswana'
                },
                {
                    display: 'Bouvet Island',
                    value: 'Bouvet Island'
                },
                {
                    display: 'Brazil',
                    value: 'Brazil'
                },
                {
                    display: 'British Indian Ocean Territory',
                    value: 'British Indian Ocean Territory'
                },
                {
                    display: 'Brunei Darussalam',
                    value: 'Brunei Darussalam'
                },
                {
                    display: 'Bulgaria',
                    value: 'Bulgaria'
                },
                {
                    display: 'Burkina Faso',
                    value: 'Burkina Faso'
                },
                {
                    display: 'Burundi',
                    value: 'Burundi'
                },
                {
                    display: 'Cambodia',
                    value: 'Cambodia'
                },
                {
                    display: 'Cameroon',
                    value: 'Cameroon'
                },
                {
                    display: 'Canada',
                    value: 'Canada'
                },
                {
                    display: 'Cape Verde',
                    value: 'Cape Verde'
                },
                {
                    display: 'Cayman Islands',
                    value: 'Cayman Islands'
                },
                {
                    display: 'Central African Republic',
                    value: 'Central African Republic'
                },
                {
                    display: 'Chad',
                    value: 'Chad'
                },
                {
                    display: 'Chile',
                    value: 'Chile'
                },
                {
                    display: 'China',
                    value: 'China'
                },
                {
                    display: 'Christmas Island',
                    value: 'Christmas Island'
                },
                {
                    display: 'Cocos (Keeling) Islands',
                    value: 'Cocos (Keeling) Islands'
                },
                {
                    display: 'Colombia',
                    value: 'Colombia'
                },
                {
                    display: 'Comoros',
                    value: 'Comoros'
                },
                {
                    display: 'Congo',
                    value: 'Congo'
                },
                {
                    display: 'Congo, The Democratic Republic of The',
                    value: 'Congo, The Democratic Republic of The'
                },
                {
                    display: 'Cook Islands',
                    value: 'Cook Islands'
                },
                {
                    display: 'Costa Rica',
                    value: 'Costa Rica'
                },
                {
                    display: 'Cote D\'ivoire',
                    value: 'Cote D\'ivoire'
                },
                {
                    display: 'Croatia',
                    value: 'Croatia'
                },
                {
                    display: 'Cuba',
                    value: 'Cuba'
                },
                {
                    display: 'Cyprus',
                    value: 'Cyprus'
                },
                {
                    display: 'Czech Republic',
                    value: 'Czech Republic'
                },
                {
                    display: 'Denmark',
                    value: 'Denmark'
                },
                {
                    display: 'Djibouti',
                    value: 'Djibouti'
                },
                {
                    display: 'Dominica',
                    value: 'Dominica'
                },
                {
                    display: 'Dominican Republic',
                    value: 'Dominican Republic'
                },
                {
                    display: 'Ecuador',
                    value: 'Ecuador'
                },
                {
                    display: 'Egypt',
                    value: 'Egypt'
                },
                {
                    display: 'El Salvador',
                    value: 'El Salvador'
                },
                {
                    display: 'Equatorial Guinea',
                    value: 'Equatorial Guinea'
                },
                {
                    display: 'Eritrea',
                    value: 'Eritrea'
                },
                {
                    display: 'Estonia',
                    value: 'Estonia'
                },
                {
                    display: 'Ethiopia',
                    value: 'Ethiopia'
                },
                {
                    display: 'Falkland Islands (Malvinas)',
                    value: 'Falkland Islands (Malvinas)'
                },
                {
                    display: 'Faroe Islands',
                    value: 'Faroe Islands'
                },
                {
                    display: 'Fiji',
                    value: 'Fiji'
                },
                {
                    display: 'Finland',
                    value: 'Finland'
                },
                {
                    display: 'France',
                    value: 'France'
                },
                {
                    display: 'French Guiana',
                    value: 'French Guiana'
                },
                {
                    display: 'French Polynesia',
                    value: 'French Polynesia'
                },
                {
                    display: 'French Southern Territories',
                    value: 'French Southern Territories'
                },
                {
                    display: 'Gabon',
                    value: 'Gabon'
                },
                {
                    display: 'Gambia',
                    value: 'Gambia'
                },
                {
                    display: 'Georgia',
                    value: 'Georgia'
                },
                {
                    display: 'Germany',
                    value: 'Germany'
                },
                {
                    display: 'Ghana',
                    value: 'Ghana'
                },
                {
                    display: 'Gibraltar',
                    value: 'Gibraltar'
                },
                {
                    display: 'Greece',
                    value: 'Greece'
                },
                {
                    display: 'Greenland',
                    value: 'Greenland'
                },
                {
                    display: 'Grenada',
                    value: 'Grenada'
                },
                {
                    display: 'Guadeloupe',
                    value: 'Guadeloupe'
                },
                {
                    display: 'Guam',
                    value: 'Guam'
                },
                {
                    display: 'Guatemala',
                    value: 'Guatemala'
                },
                {
                    display: 'Guinea',
                    value: 'Guinea'
                },
                {
                    display: 'Guinea-bissau',
                    value: 'Guinea-bissau'
                },
                {
                    display: 'Guyana',
                    value: 'Guyana'
                },
                {
                    display: 'Haiti',
                    value: 'Haiti'
                },
                {
                    display: 'Heard Island and Mcdonald Islands',
                    value: 'Heard Island and Mcdonald Islands'
                },
                {
                    display: 'Holy See (Vatican City State)',
                    value: 'Holy See (Vatican City State)'
                },
                {
                    display: 'Honduras',
                    value: 'Honduras'
                },
                {
                    display: 'Hong Kong',
                    value: 'Hong Kong'
                },
                {
                    display: 'Hungary',
                    value: 'Hungary'
                },
                {
                    display: 'Iceland',
                    value: 'Iceland'
                },
                {
                    display: 'India',
                    value: 'India'
                },
                {
                    display: 'Indonesia',
                    value: 'Indonesia'
                },
                {
                    display: 'Iran, Islamic Republic of',
                    value: 'Iran, Islamic Republic of'
                },
                {
                    display: 'Iraq',
                    value: 'Iraq'
                },
                {
                    display: 'Ireland',
                    value: 'Ireland'
                },
                {
                    display: 'Israel',
                    value: 'Israel'
                },
                {
                    display: 'Italy',
                    value: 'Italy'
                },
                {
                    display: 'Jamaica',
                    value: 'Jamaica'
                },
                {
                    display: 'Japan',
                    value: 'Japan'
                },
                {
                    display: 'Jordan',
                    value: 'Jordan'
                },
                {
                    display: 'Kazakhstan',
                    value: 'Kazakhstan'
                },
                {
                    display: 'Kenya',
                    value: 'Kenya'
                },
                {
                    display: 'Kiribati',
                    value: 'Kiribati'
                },
                {
                    display: 'Korea, Democratic People\'s Republic of',
                    value: 'Korea, Democratic People\'s Republic of'
                },
                {
                    display: 'Korea, Republic of',
                    value: 'Korea, Republic of'
                },
                {
                    display: 'Kuwait',
                    value: 'Kuwait'
                },
                {
                    display: 'Kyrgyzstan',
                    value: 'Kyrgyzstan'
                },
                {
                    display: 'Lao People\'s Democratic Republic',
                    value: 'Lao People\'s Democratic Republic'
                },
                {
                    display: 'Latvia',
                    value: 'Latvia'
                },
                {
                    display: 'Lebanon',
                    value: 'Lebanon'
                },
                {
                    display: 'Lesotho',
                    value: 'Lesotho'
                },
                {
                    display: 'Liberia',
                    value: 'Liberia'
                },
                {
                    display: 'Libyan Arab Jamahiriya',
                    value: 'Libyan Arab Jamahiriya'
                },
                {
                    display: 'Liechtenstein',
                    value: 'Liechtenstein'
                },
                {
                    display: 'Lithuania',
                    value: 'Lithuania'
                },
                {
                    display: 'Luxembourg',
                    value: 'Luxembourg'
                },
                {
                    display: 'Macao',
                    value: 'Macao'
                },
                {
                    display: 'Macedonia, The Former Yugoslav Republic of',
                    value: 'Macedonia, The Former Yugoslav Republic of'
                },
                {
                    display: 'Madagascar',
                    value: 'Madagascar'
                },
                {
                    display: 'Malawi',
                    value: 'Malawi'
                },
                {
                    display: 'Malaysia',
                    value: 'Malaysia'
                },
                {
                    display: 'Maldives',
                    value: 'Maldives'
                },
                {
                    display: 'Mali',
                    value: 'Mali'
                },
                {
                    display: 'Malta',
                    value: 'Malta'
                },
                {
                    display: 'Marshall Islands',
                    value: 'Marshall Islands'
                },
                {
                    display: 'Martinique',
                    value: 'Martinique'
                },
                {
                    display: 'Mauritania',
                    value: 'Mauritania'
                },
                {
                    display: 'Mauritius',
                    value: 'Mauritius'
                },
                {
                    display: 'Mayotte',
                    value: 'Mayotte'
                },
                {
                    display: 'Mexico',
                    value: 'Mexico'
                },
                {
                    display: 'Micronesia, Federated States of',
                    value: 'Micronesia, Federated States of'
                },
                {
                    display: 'Moldova, Republic of',
                    value: 'Moldova, Republic of'
                },
                {
                    display: 'Monaco',
                    value: 'Monaco'
                },
                {
                    display: 'Mongolia',
                    value: 'Mongolia'
                },
                {
                    display: 'Montserrat',
                    value: 'Montserrat'
                },
                {
                    display: 'Morocco',
                    value: 'Morocco'
                },
                {
                    display: 'Mozambique',
                    value: 'Mozambique'
                },
                {
                    display: 'Myanmar',
                    value: 'Myanmar'
                },
                {
                    display: 'Namibia',
                    value: 'Namibia'
                },
                {
                    display: 'Nauru',
                    value: 'Nauru'
                },
                {
                    display: 'Nepal',
                    value: 'Nepal'
                },
                {
                    display: 'Netherlands',
                    value: 'Netherlands'
                },
                {
                    display: 'Netherlands Antilles',
                    value: 'Netherlands Antilles'
                },
                {
                    display: 'New Caledonia',
                    value: 'New Caledonia'
                },
                {
                    display: 'New Zealand',
                    value: 'New Zealand'
                },
                {
                    display: 'Nicaragua',
                    value: 'Nicaragua'
                },
                {
                    display: 'Niger',
                    value: 'Niger'
                },
                {
                    display: 'Nigeria',
                    value: 'Nigeria'
                },
                {
                    display: 'Niue',
                    value: 'Niue'
                },
                {
                    display: 'Norfolk Island',
                    value: 'Norfolk Island'
                },
                {
                    display: 'Northern Mariana Islands',
                    value: 'Northern Mariana Islands'
                },
                {
                    display: 'Norway',
                    value: 'Norway'
                },
                {
                    display: 'Oman',
                    value: 'Oman'
                },
                {
                    display: 'Pakistan',
                    value: 'Pakistan'
                },
                {
                    display: 'Palau',
                    value: 'Palau'
                },
                {
                    display: 'Palestinian Territory, Occupied',
                    value: 'Palestinian Territory, Occupied'
                },
                {
                    display: 'Panama',
                    value: 'Panama'
                },
                {
                    display: 'Papua New Guinea',
                    value: 'Papua New Guinea'
                },
                {
                    display: 'Paraguay',
                    value: 'Paraguay'
                },
                {
                    display: 'Peru',
                    value: 'Peru'
                },
                {
                    display: 'Philippines',
                    value: 'Philippines'
                },
                {
                    display: 'Pitcairn',
                    value: 'Pitcairn'
                },
                {
                    display: 'Poland',
                    value: 'Poland'
                },
                {
                    display: 'Portugal',
                    value: 'Portugal'
                },
                {
                    display: 'Puerto Rico',
                    value: 'Puerto Rico'
                },
                {
                    display: 'Qatar',
                    value: 'Qatar'
                },
                {
                    display: 'Reunion',
                    value: 'Reunion'
                },
                {
                    display: 'Romania',
                    value: 'Romania'
                },
                {
                    display: 'Russian Federation',
                    value: 'Russian Federation'
                },
                {
                    display: 'Rwanda',
                    value: 'Rwanda'
                },
                {
                    display: 'Saint Helena',
                    value: 'Saint Helena'
                },
                {
                    display: 'Saint Kitts and Nevis',
                    value: 'Saint Kitts and Nevis'
                },
                {
                    display: 'Saint Lucia',
                    value: 'Saint Lucia'
                },
                {
                    display: 'Saint Pierre and Miquelon',
                    value: 'Saint Pierre and Miquelon'
                },
                {
                    display: 'Saint Vincent and The Grenadines',
                    value: 'Saint Vincent and The Grenadines'
                },
                {
                    display: 'Samoa',
                    value: 'Samoa'
                },
                {
                    display: 'San Marino',
                    value: 'San Marino'
                },
                {
                    display: 'Sao Tome and Principe',
                    value: 'Sao Tome and Principe'
                },
                {
                    display: 'Saudi Arabia',
                    value: 'Saudi Arabia'
                },
                {
                    display: 'Senegal',
                    value: 'Senegal'
                },
                {
                    display: 'Serbia and Montenegro',
                    value: 'Serbia and Montenegro'
                },
                {
                    display: 'Seychelles',
                    value: 'Seychelles'
                },
                {
                    display: 'Sierra Leone',
                    value: 'Sierra Leone'
                },
                {
                    display: 'Singapore',
                    value: 'Singapore'
                },
                {
                    display: 'Slovakia',
                    value: 'Slovakia'
                },
                {
                    display: 'Slovenia',
                    value: 'Slovenia'
                },
                {
                    display: 'Solomon Islands',
                    value: 'Solomon Islands'
                },
                {
                    display: 'Somalia',
                    value: 'Somalia'
                },
                {
                    display: 'South Africa',
                    value: 'South Africa'
                },
                {
                    display: 'South Georgia and The South Sandwich Islands',
                    value: 'South Georgia and The South Sandwich Islands'
                },
                {
                    display: 'Spain',
                    value: 'Spain'
                },
                {
                    display: 'Sri Lanka',
                    value: 'Sri Lanka'
                },
                {
                    display: 'Sudan',
                    value: 'Sudan'
                },
                {
                    display: 'Suriname',
                    value: 'Suriname'
                },
                {
                    display: 'Svalbard and Jan Mayen',
                    value: 'Svalbard and Jan Mayen'
                },
                {
                    display: 'Swaziland',
                    value: 'Swaziland'
                },
                {
                    display: 'Sweden',
                    value: 'Sweden'
                },
                {
                    display: 'Switzerland',
                    value: 'Switzerland'
                },
                {
                    display: 'Syrian Arab Republic',
                    value: 'Syrian Arab Republic'
                },
                {
                    display: 'Taiwan',
                    value: 'Taiwan'
                },
                {
                    display: 'Tajikistan',
                    value: 'Tajikistan'
                },
                {
                    display: 'Tanzania, United Republic of',
                    value: 'Tanzania, United Republic of'
                },
                {
                    display: 'Thailand',
                    value: 'Thailand'
                },
                {
                    display: 'Timor-leste',
                    value: 'Timor-leste'
                },
                {
                    display: 'Togo',
                    value: 'Togo'
                },
                {
                    display: 'Tokelau',
                    value: 'Tokelau'
                },
                {
                    display: 'Tonga',
                    value: 'Tonga'
                },
                {
                    display: 'Trinidad and Tobago',
                    value: 'Trinidad and Tobago'
                },
                {
                    display: 'Tunisia',
                    value: 'Tunisia'
                },
                {
                    display: 'Turkey',
                    value: 'Turkey'
                },
                {
                    display: 'Turkmenistan',
                    value: 'Turkmenistan'
                },
                {
                    display: 'Turks and Caicos Islands',
                    value: 'Turks and Caicos Islands'
                },
                {
                    display: 'Tuvalu',
                    value: 'Tuvalu'
                },
                {
                    display: 'Uganda',
                    value: 'Uganda'
                },
                {
                    display: 'Ukraine',
                    value: 'Ukraine'
                },
                {
                    display: 'United Arab Emirates',
                    value: 'United Arab Emirates'
                },
                {
                    display: 'United Kingdom',
                    value: 'United Kingdom'
                },
                {
                    display: 'United States',
                    value: 'United States'
                },
                {
                    display: 'United States Minor Outlying Islands',
                    value: 'United States Minor Outlying Islands'
                },
                {
                    display: 'Uruguay',
                    value: 'Uruguay'
                },
                {
                    display: 'Uzbekistan',
                    value: 'Uzbekistan'
                },
                {
                    display: 'Vanuatu',
                    value: 'Vanuatu'
                },
                {
                    display: 'Venezuela',
                    value: 'Venezuela'
                },
                {
                    display: 'Viet Nam',
                    value: 'Viet Nam'
                },
                {
                    display: 'Virgin Islands, British',
                    value: 'Virgin Islands, British'
                },
                {
                    display: 'Virgin Islands, U.S.',
                    value: 'Virgin Islands, U.S.'
                },
                {
                    display: 'Wallis and Futuna',
                    value: 'Wallis and Futuna'
                },
                {
                    display: 'Western Sahara',
                    value: 'Western Sahara'
                },
                {
                    display: 'Yemen',
                    value: 'Yemen'
                },
                {
                    display: 'Zambia',
                    value: 'Zambia'
                },
                {
                    display: 'Zimbabwe',
                    value: 'Zimbabwe'
                }
            ]
        }
    }
}

module.exports = options;