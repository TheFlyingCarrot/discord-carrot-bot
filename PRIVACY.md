# Privacy Policy

## Collected Data

Carrot Bot collects data from the Discord API for the purposes of helping the developer(s) debug the app, and process commands. This data includes, but is not limited to:

* Username
* User ID
* User Discriminator
* User Tag
* Messages:
  * Message Content
  * Creation Date & Time
  * Edit History

## Heroku

Carrot Bot is deployed on **[Heroku](https://www.heroku.com/policy/security)**.

### Security Assessments and Compliance

#### Data Centers

Heroku’s physical infrastructure is hosted and managed within Amazon’s secure data centers and utilize the Amazon Web Service (AWS) technology. Amazon continually manages risk and undergoes recurring assessments to ensure compliance with industry standards. Amazon’s data center operations have been accredited under:

* ISO 27001
* SOC 1 and SOC 2/SSAE 16/ISAE 3402 (Previously: SAS 70 Type II)
* PCI Level 1
* FISMA Moderate
* Sarbanes-Oxley (SOX)

#### PCI

Heroku uses PCI compliant payment processor Braintree for encrypting and processing credit card payments. Heroku’s infrastructure provider is PCI Level 1 compliant.

#### Sarbanes-Oxley

As a publicly traded company in the United States, salesforce.com is audited annually and remains in compliance with the Sarbanes-Oxley (SOX) Act of 2002.

### Network Security

#### Firewalls

Firewalls are utilized to restrict access to systems from external networks and between systems internally. By default, all access is denied and only explicitly allowed ports and protocols are allowed based on business need.  Each system is assigned to a firewall security group based on the system’s function. Security groups restrict access to only the ports and protocols required for a system’s specific function to mitigate risk.

Host-based firewalls restrict customer applications from establishing localhost connections over the loopback network interface to further isolate customer applications. Host-based firewalls also provide the ability to further limit inbound and outbound connections as needed.

#### DDoS Mitigation

Our (Heroku) infrastructure provides DDoS mitigation techniques including TCP Syn cookies and connection rate limiting in addition to maintaining multiple backbone connections and internal bandwidth capacity that exceeds the Internet carrier supplied bandwidth.  We work closely with our providers to quickly respond to events and enable advanced DDoS mitigation controls when needed.

#### Spoofing and Sniffing Protections

Managed firewalls prevent IP, MAC, and ARP spoofing on the network and between virtual hosts to ensure spoofing is not possible. Packet sniffing is prevented by infrastructure including the hypervisor which will not deliver traffic to an interface which it is not addressed to.  Heroku utilizes application isolation, operating system restrictions, and encrypted connections to further ensure risk is mitigated at all levels.

#### Port Scanning

Port scanning is prohibited and every reported instance is investigated by our infrastructure provider.  When port scans are detected, they are stopped and access is blocked.

### Data Security

#### Customer Applications

Each application on the Heroku platform runs within its own isolated environment and cannot interact with other applications or areas of the system. This restrictive operating environment is designed to prevent security and stability issues.  These self-contained environments isolate processes, memory, and the file system using LXC while host-based firewalls restrict applications from establishing local network connections.

### System Security

#### System Configuration

System configuration and consistency is maintained through standard, up-to-date images, configuration management software, and by replacing systems with updated deployments. Systems are deployed using up-to-date images that are updated with configuration changes and security updates before deployment. Once deployed, existing systems are decommissioned and replaced with up-to-date systems.

#### Customer Application Isolation

Applications on the Heroku platform run within their own isolated environment and cannot interact with other applications or areas of the system to prevent security and stability issues.  These self-contained environments isolate processes, memory, and the file system while host-based firewalls restrict applications from establishing local network connections.

### Privacy

Heroku has a published privacy policy that clearly defines what data is collected and how it is used. Heroku and salesforce.com are committed to customer privacy and transparency.

We (Heroku) take steps to protect the privacy of our customers and protect data stored within the platform. Some of the protections inherent to Heroku’s products include authentication, access controls, data transport encryption, HTTPS support for customer applications, and the ability for customers to encrypt stored data. For additional information see: https://www.heroku.com/policy/privacy
