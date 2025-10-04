document.addEventListener('DOMContentLoaded', () => {

    // --- Mock Data ---
    const MOCK_USERS = [
        { email: 'user1@cmlre.gov', role: 'Researcher', lastLogin: '2h ago', analyses: 128, status: 'Active' },
        { email: 'user2@cmlre.gov', role: 'Admin', lastLogin: '1d ago', analyses: 42, status: 'Active' },
        { email: 'user3@cmlre.gov', role: 'Researcher', lastLogin: '5d ago', analyses: 7, status: 'Suspended' },
        { email: 'user4@partner.org', role: 'Collaborator', lastLogin: '3h ago', analyses: 215, status: 'Active' },
        { email: 'user5@cmlre.gov', role: 'Researcher', lastLogin: '1m ago', analyses: 1, status: 'Pending' },
        { email: 'user6@new.net', role: 'Collaborator', lastLogin: '5m ago', analyses: 0, status: 'Pending' }
    ];

    // --- Mock Novelty Dictionary Data ---
    const NOVELTY_DICTIONARY = [
        {
            uid: 'BLC-A4B81EF2',
            taxonomy: { kingdom: 'Eukaryota', phylum: 'Metazoa', class: 'Chordata', order: 'Eleutherozoa', family: 'Echinozoa', genus: 'Euteleostomi', species: 'Unknown' },
            region: 'Arabian Sea',
            coordinates: { lat: 18.5, lon: 72.8 },
            organization: 'CMLRE - ESSO',
            project: 'Marine Biodiversity Survey 2025',
            abundance: 12,
            percentage: 8.5,
            depth: 250,
            habitat: 'Mesopelagic Zone',
            marker: 'COI',
            confidence: 94.2,
            date: '2025-09-28',
            notes: 'This novel species was identified during routine eDNA sampling operations. The sequence shows unique genetic markers not previously documented in existing taxonomic databases.'
        },
        {
            uid: 'BLC-1ED29DB8',
            taxonomy: { kingdom: 'Eukaryota', phylum: 'Alveolata', class: 'Apicomplexa', order: 'Ciliophora', family: 'Gregarinasina', genus: 'Unknown', species: 'Unknown' },
            region: 'Bay of Bengal',
            coordinates: { lat: 15.3, lon: 88.2 },
            organization: 'NIOT - Chennai',
            project: 'Deep Sea Exploration',
            abundance: 8,
            percentage: 5.2,
            depth: 1200,
            habitat: 'Bathypelagic Zone',
            marker: '18S rRNA',
            confidence: 91.8,
            date: '2025-09-15',
            notes: 'Discovered at extreme depths. Shows characteristics of deep-sea adapted microorganisms.'
        },
        {
            uid: 'BLC-E18BB87D',
            taxonomy: { kingdom: 'Eukaryota', phylum: 'Sar', class: 'Rhizaria', order: 'Retaria', family: 'Foraminifera', genus: 'Unknown', species: 'Unknown' },
            region: 'Indian Ocean',
            coordinates: { lat: -12.5, lon: 75.8 },
            organization: 'INCOIS - Hyderabad',
            project: 'Coral Reef Monitoring',
            abundance: 24,
            percentage: 15.8,
            depth: 45,
            habitat: 'Epipelagic Zone',
            marker: 'COI',
            confidence: 96.5,
            date: '2025-09-22',
            notes: 'Found in coral reef ecosystem. Potentially important for reef health assessment.'
        },
        {
            uid: 'BLC-2263611E',
            taxonomy: { kingdom: 'Eukaryota', phylum: 'Sar', class: 'Stramenopiles', order: 'Oomycota', family: 'Saprolegniomycetes', genus: 'Unknown', species: 'Unknown' },
            region: 'Arabian Sea',
            coordinates: { lat: 20.1, lon: 70.5 },
            organization: 'CMLRE - ESSO',
            project: 'Pathogen Surveillance',
            abundance: 6,
            percentage: 3.9,
            depth: 80,
            habitat: 'Mesopelagic Zone',
            marker: '18S rRNA',
            confidence: 88.9,
            date: '2025-10-01',
            notes: 'Potential marine pathogen detected. Further analysis recommended for disease monitoring.'
        },
        {
            uid: 'BLC-F3A219C4',
            taxonomy: { kingdom: 'Eukaryota', phylum: 'Arthropoda', class: 'Crustacea', order: 'Decapoda', family: 'Penaeidae', genus: 'Unknown', species: 'Unknown' },
            region: 'Pacific Ocean',
            coordinates: { lat: 8.5, lon: 135.2 },
            organization: 'FSI - Mumbai',
            project: 'Fishery Stock Assessment',
            abundance: 18,
            percentage: 11.2,
            depth: 150,
            habitat: 'Mesopelagic Zone',
            marker: 'COI',
            confidence: 92.7,
            date: '2025-09-10',
            notes: 'Novel crustacean species with potential commercial value. Similar to known shrimp species but genetically distinct.'
        },
        {
            uid: 'BLC-C5E892A1',
            taxonomy: { kingdom: 'Eukaryota', phylum: 'Mollusca', class: 'Cephalopoda', order: 'Octopoda', family: 'Octopodidae', genus: 'Unknown', species: 'Unknown' },
            region: 'Bay of Bengal',
            coordinates: { lat: 18.2, lon: 84.5 },
            organization: 'ZSI - Kolkata',
            project: 'Benthic Diversity Study',
            abundance: 3,
            percentage: 2.1,
            depth: 850,
            habitat: 'Bathyal Zone',
            marker: 'COI',
            confidence: 95.3,
            date: '2025-09-05',
            notes: 'Deep-sea octopus species showing unique bioluminescent properties based on environmental observations.'
        },
        {
            uid: 'BLC-7D4B21F8',
            taxonomy: { kingdom: 'Eukaryota', phylum: 'Cnidaria', class: 'Anthozoa', order: 'Scleractinia', family: 'Acroporidae', genus: 'Unknown', species: 'Unknown' },
            region: 'Indian Ocean',
            coordinates: { lat: -8.9, lon: 72.3 },
            organization: 'CMFRI - Kochi',
            project: 'Coral Restoration Initiative',
            abundance: 15,
            percentage: 9.8,
            depth: 30,
            habitat: 'Reef Zone',
            marker: '18S rRNA',
            confidence: 97.1,
            date: '2025-09-18',
            notes: 'Novel coral species with high heat tolerance. Important for climate change adaptation studies.'
        },
        {
            uid: 'BLC-9K3M45P2',
            taxonomy: { kingdom: 'Eukaryota', phylum: 'Echinodermata', class: 'Asteroidea', order: 'Valvatida', family: 'Oreasteridae', genus: 'Unknown', species: 'Unknown' },
            region: 'Atlantic Ocean',
            coordinates: { lat: 28.5, lon: -15.4 },
            organization: 'International Partners',
            project: 'Global Biodiversity Hotspot',
            abundance: 9,
            percentage: 6.1,
            depth: 120,
            habitat: 'Continental Shelf',
            marker: 'COI',
            confidence: 90.4,
            date: '2025-08-28',
            notes: 'Starfish species with unusual feeding behavior patterns observed in video footage.'
        }
    ];

    // --- Element References ---
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const approvalListContainer = document.getElementById('approval-list');
    const userTableBody = document.getElementById('user-table-body');
    const userSearchInput = document.getElementById('user-search');
    const selectAllUsersCheckbox = document.getElementById('select-all-users');
    const modal = document.getElementById('confirmation-modal');
    const modalText = document.getElementById('modal-text');
    const modalCancel = document.getElementById('modal-cancel');
    const modalConfirm = document.getElementById('modal-confirm');
    const logoutBtn = document.getElementById('logout-btn');
    const exportUsersBtn = document.getElementById('export-users-btn');
    const promoteModelBtn = document.getElementById('promote-model-btn');
    const notificationsBtn = document.getElementById('notifications-btn');
    const profileBtn = document.getElementById('profile-btn');
    const sidebarNav = document.getElementById('sidebar-nav');
    const breadcrumbActive = document.getElementById('breadcrumb-active');
    const dashboardView = document.getElementById('dashboard-view');
    const settingsView = document.getElementById('settings-view');
    const dictionaryView = document.getElementById('dictionary-view');
    const mainContent = document.getElementById('main-content');

    // Dictionary elements
    const dictionaryGrid = document.getElementById('dictionary-grid');
    const dictionarySearch = document.getElementById('dictionary-search');
    const filterRegion = document.getElementById('filter-region');
    const filterPhylum = document.getElementById('filter-phylum');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const exportDictionaryBtn = document.getElementById('export-dictionary-btn');
    const dictPrevPage = document.getElementById('dict-prev-page');
    const dictNextPage = document.getElementById('dict-next-page');
    const dictCurrentPage = document.getElementById('dict-current-page');
    const dictTotalPages = document.getElementById('dict-total-pages');
    const totalDiscoveriesEl = document.getElementById('total-discoveries');
    const totalRegionsEl = document.getElementById('total-regions');
    const totalOrgsEl = document.getElementById('total-orgs');
    const recentDiscoveriesEl = document.getElementById('recent-discoveries');
    
    // Modal elements
    const speciesModal = document.getElementById('species-detail-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // System Settings buttons
    const changePasswordBtn = document.getElementById('change-password-btn');
    const deleteAccountBtn = document.getElementById('delete-account-btn');

    let onConfirmCallback = null;

    // --- Modal Logic ---
    const showModal = (text, onConfirm) => {
        modalText.textContent = text;
        onConfirmCallback = onConfirm;
        modal.classList.remove('hidden');
    };

    const hideModal = () => {
        modal.classList.add('hidden');
        onConfirmCallback = null;
    };
    
    modalConfirm.addEventListener('click', () => {
        if (onConfirmCallback) {
            onConfirmCallback();
        }
        hideModal();
    });
    modalCancel.addEventListener('click', hideModal);

    // --- Header Button Functionality ---
    logoutBtn.addEventListener('click', () => {
        showModal('Are you sure you want to log out?', () => {
            console.log('Logging out...');
            window.location.href = './index.html';
        });
    });
    
    notificationsBtn.addEventListener('click', () => alert('Notifications:\n- New user registered\n- Analysis batch #123 complete'));
    profileBtn.addEventListener('click', () => alert('Admin Profile:\n- View Profile\n- Settings\n- API Keys'));

    // --- Sidebar Navigation ---
    sidebarNav.addEventListener('click', (e) => {
        e.preventDefault();
        const link = e.target.closest('a');
        if (!link) return;

        const targetId = link.getAttribute('href');

        // Update active styles
        sidebarNav.querySelectorAll('a').forEach(l => {
            l.classList.remove('text-white', 'bg-gray-800');
            l.classList.add('text-gray-400');
        });
        link.classList.add('text-white', 'bg-gray-800');
        link.classList.remove('text-gray-400');
        
        // Update breadcrumb
        breadcrumbActive.textContent = link.querySelector('span').textContent;

        // View/Section Switching
        if (targetId === '#settings') {
            dashboardView.classList.add('hidden');
            settingsView.classList.remove('hidden');
            dictionaryView.classList.add('hidden');
            setTimeout(() => settingsView.querySelector('.reveal')?.classList.add('visible'), 50);
        } else if (targetId === '#dictionary') {
            dashboardView.classList.add('hidden');
            settingsView.classList.add('hidden');
            dictionaryView.classList.remove('hidden');
            initializeDictionary();
        } else {
            dashboardView.classList.remove('hidden');
            settingsView.classList.add('hidden');
            dictionaryView.classList.add('hidden');
            const targetSection = document.getElementById(targetId.substring(1) + '-section');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Close sidebar on mobile after clicking a link
        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.remove('active');
        }
    });


    // --- Sidebar Toggle for Mobile ---
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        sidebarOverlay.classList.toggle('active');
    });

    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.remove('active');
    });
    
    // --- Skeleton Loading Simulation ---
    const showSkeletons = (show) => {
        const skeletons = ['api-status', 'active-users', 'queue', 'accuracy'];
        skeletons.forEach(id => {
            document.getElementById(`${id}-skeleton`).style.display = show ? 'block' : 'none';
            document.getElementById(`${id}-content`).style.display = show ? 'none' : 'block';
        });
    };

    // --- User Table & Approval Logic ---
    const renderApprovalList = () => {
        const pendingUsers = MOCK_USERS.filter(user => user.status === 'Pending');
        if (pendingUsers.length === 0) {
            approvalListContainer.innerHTML = `<p class="text-sm text-gray-500">No new registrations requiring approval.</p>`;
            return;
        }
        approvalListContainer.innerHTML = pendingUsers.map(user => `
            <div class="flex items-center justify-between bg-gray-800/50 p-3 rounded-md">
                <div>
                    <p class="text-sm font-medium">${user.email}</p>
                    <p class="text-xs text-gray-400">Role: ${user.role}</p>
                </div>
                <div class="flex space-x-2">
                    <button data-action="approve" data-email="${user.email}" class="btn-primary text-xs px-3 py-1 !border-green-500 !text-green-400 hover:!bg-green-500 hover:!text-black">Approve</button>
                    <button data-action="deny" data-email="${user.email}" class="btn-secondary text-xs px-3 py-1 !border-red-500 !text-red-400 hover:!bg-red-500 hover:!text-white">Deny</button>
                </div>
            </div>
        `).join('');
    };
    
    const renderUserTable = (users) => {
        const approvedUsers = users.filter(user => user.status !== 'Pending');
        userTableBody.innerHTML = approvedUsers.map(user => `
            <tr class="border-b border-gray-800 hover:bg-gray-800/50">
                <td class="py-3 px-2"><input type="checkbox" class="user-checkbox bg-black border-gray-600"></td>
                <td class="py-3">${user.email}</td>
                <td class="py-3 text-gray-400">${user.role}</td>
                <td class="py-3 text-gray-400">${user.lastLogin}</td>
                <td class="py-3 text-right text-gray-400">${user.analyses}</td>
                <td class="py-3 text-center">
                    <span class="px-2 py-1 text-xs rounded-full ${
                        user.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        user.status === 'Suspended' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                    }">${user.status}</span>
                </td>
            </tr>
        `).join('');
    };

    approvalListContainer.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const action = button.dataset.action;
        const email = button.dataset.email;
        const userIndex = MOCK_USERS.findIndex(user => user.email === email);

        if (userIndex === -1) return;

        if (action === 'approve') {
            MOCK_USERS[userIndex].status = 'Active';
        } else if (action === 'deny') {
            MOCK_USERS.splice(userIndex, 1);
        }

        renderApprovalList();
        renderUserTable(MOCK_USERS);
    });

    userSearchInput.addEventListener('keyup', () => {
        const searchTerm = userSearchInput.value.toLowerCase();
        const filteredUsers = MOCK_USERS.filter(user => user.email.toLowerCase().includes(searchTerm));
        renderUserTable(filteredUsers);
    });

    selectAllUsersCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        userTableBody.querySelectorAll('.user-checkbox').forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    });
    
    userTableBody.addEventListener('change', (e) => {
        if (e.target.classList.contains('user-checkbox')) {
            const allCheckboxes = userTableBody.querySelectorAll('.user-checkbox');
            const allChecked = Array.from(allCheckboxes).every(checkbox => checkbox.checked);
            selectAllUsersCheckbox.checked = allChecked;
        }
    });
    
    exportUsersBtn.addEventListener('click', () => {
        showModal('Export all users to CSV?', () => {
            const headers = Object.keys(MOCK_USERS[0]).join(',');
            const csv = MOCK_USERS.map(row => Object.values(row).join(',')).join('\n');
            const csvContent = `${headers}\n${csv}`;
            console.log("--- EXPORTING CSV DATA ---");
            console.log(csvContent);
            alert('User data exported to browser console.');
        });
    });
    
    // --- Model Performance ---
    promoteModelBtn.addEventListener('click', () => {
        showModal('Are you sure you want to promote model v3.0 to production?', () => {
            console.log('Promoting model v3.0...');
            promoteModelBtn.textContent = 'PROMOTED';
            promoteModelBtn.disabled = true;
            alert('Model v3.0 has been promoted.');
        });
    });

    // --- System Settings Functionality ---
    changePasswordBtn.addEventListener('click', () => {
        alert('Password change screen would appear here.');
    });

    deleteAccountBtn.addEventListener('click', () => {
        showModal('This action is irreversible and will delete all associated data. Are you sure?', () => {
            console.log('Deleting account...');
            alert('Account has been deleted (simulated).');
        });
    });

    // --- Novelty Dictionary Functionality ---
    let currentDictPage = 1;
    const itemsPerPage = 9;
    let filteredDictionary = [...NOVELTY_DICTIONARY];

    const updateDictionaryStats = () => {
        totalDiscoveriesEl.textContent = NOVELTY_DICTIONARY.length;
        const uniqueRegions = new Set(NOVELTY_DICTIONARY.map(item => item.region));
        totalRegionsEl.textContent = uniqueRegions.size;
        const uniqueOrgs = new Set(NOVELTY_DICTIONARY.map(item => item.organization));
        totalOrgsEl.textContent = uniqueOrgs.size;
        
        // Count recent discoveries (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recent = NOVELTY_DICTIONARY.filter(item => new Date(item.date) >= thirtyDaysAgo);
        recentDiscoveriesEl.textContent = recent.length;
    };

    const renderDictionaryCard = (item) => {
        const deepestTaxon = item.taxonomy.species !== 'Unknown' ? item.taxonomy.species :
                            item.taxonomy.genus !== 'Unknown' ? item.taxonomy.genus :
                            item.taxonomy.family !== 'Unknown' ? item.taxonomy.family :
                            item.taxonomy.order !== 'Unknown' ? item.taxonomy.order :
                            item.taxonomy.class !== 'Unknown' ? item.taxonomy.class :
                            item.taxonomy.phylum !== 'Unknown' ? item.taxonomy.phylum : 'Unknown';

        return `
            <div class="card p-5 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group" data-uid="${item.uid}">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <h3 class="text-lg font-bold text-white font-mono mb-1 group-hover:text-blue-400 transition">${item.uid}</h3>
                        <p class="text-sm text-gray-400">${deepestTaxon}</p>
                    </div>
                    <div class="px-2 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-semibold">
                        NOVEL
                    </div>
                </div>

                <div class="space-y-2.5 text-xs">
                    <div class="flex items-center gap-2 text-gray-300">
                        <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span class="truncate">${item.region}</span>
                    </div>

                    <div class="flex items-center gap-2 text-gray-300">
                        <svg class="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        <span class="truncate">${item.organization}</span>
                    </div>

                    <div class="flex items-center justify-between pt-2 border-t border-gray-800">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                            <span class="text-white font-mono font-semibold">${item.abundance}</span>
                            <span class="text-gray-500">seq</span>
                        </div>
                        <div class="text-gray-400">${new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                </div>

                <div class="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between text-xs">
                    <span class="text-gray-500">Phylum: <span class="text-gray-300">${item.taxonomy.phylum}</span></span>
                    <span class="text-blue-400 font-semibold group-hover:underline">View Details →</span>
                </div>
            </div>
        `;
    };

    const renderDictionaryPage = () => {
        const totalPages = Math.ceil(filteredDictionary.length / itemsPerPage);
        const startIndex = (currentDictPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = filteredDictionary.slice(startIndex, endIndex);

        if (pageItems.length === 0) {
            dictionaryGrid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500">No discoveries match your filters.</div>';
        } else {
            dictionaryGrid.innerHTML = pageItems.map(item => renderDictionaryCard(item)).join('');
        }

        dictCurrentPage.textContent = currentDictPage;
        dictTotalPages.textContent = totalPages || 1;
        dictPrevPage.disabled = currentDictPage === 1;
        dictNextPage.disabled = currentDictPage >= totalPages;
    };

    const applyDictionaryFilters = () => {
        const searchTerm = dictionarySearch.value.toLowerCase();
        const regionFilter = filterRegion.value;
        const phylumFilter = filterPhylum.value;

        filteredDictionary = NOVELTY_DICTIONARY.filter(item => {
            const matchesSearch = item.uid.toLowerCase().includes(searchTerm) ||
                                 item.region.toLowerCase().includes(searchTerm) ||
                                 item.organization.toLowerCase().includes(searchTerm);
            const matchesRegion = regionFilter === 'all' || item.region.toLowerCase().includes(regionFilter.toLowerCase().replace('-', ' '));
            const matchesPhylum = phylumFilter === 'all' || item.taxonomy.phylum.toLowerCase().includes(phylumFilter.toLowerCase());
            
            return matchesSearch && matchesRegion && matchesPhylum;
        });

        currentDictPage = 1;
        renderDictionaryPage();
    };

    const showSpeciesModal = (uid) => {
        const species = NOVELTY_DICTIONARY.find(item => item.uid === uid);
        if (!species) return;

        document.getElementById('modal-uid').textContent = species.uid;
        document.getElementById('modal-date').textContent = `Discovered: ${new Date(species.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        
        // Taxonomy
        const taxonomyHTML = Object.entries(species.taxonomy)
            .filter(([key, value]) => value !== 'Unknown')
            .map(([key, value]) => `
                <div class="flex items-start py-1.5 hover:bg-white/5 rounded px-2 -mx-2 transition">
                    <span class="text-gray-600 w-24 text-xs capitalize">${key}</span>
                    <span class="text-white font-semibold flex-1">${value}</span>
                </div>
            `).join('');
        document.getElementById('modal-taxonomy').innerHTML = taxonomyHTML;

        // Metadata
        document.getElementById('modal-region').textContent = species.region;
        document.getElementById('modal-coordinates').textContent = `Lat: ${species.coordinates.lat}°, Lon: ${species.coordinates.lon}°`;
        document.getElementById('modal-org').textContent = species.organization;
        document.getElementById('modal-project').textContent = `Project: ${species.project}`;
        document.getElementById('modal-abundance').textContent = `${species.abundance} sequences`;
        document.getElementById('modal-percentage').textContent = `${species.percentage}% of sample`;
        document.getElementById('modal-depth').textContent = `${species.depth} meters`;
        document.getElementById('modal-habitat').textContent = species.habitat;
        document.getElementById('modal-marker').textContent = species.marker;
        document.getElementById('modal-confidence').textContent = `${species.confidence}%`;
        document.getElementById('modal-notes').textContent = species.notes;

        // Store current species data for buttons
        currentSpeciesData = species;

        speciesModal.classList.remove('hidden');
    };

    const initializeDictionary = () => {
        updateDictionaryStats();
        applyDictionaryFilters();
    };

    // Event Listeners
    dictionarySearch.addEventListener('input', applyDictionaryFilters);
    filterRegion.addEventListener('change', applyDictionaryFilters);
    filterPhylum.addEventListener('change', applyDictionaryFilters);
    clearFiltersBtn.addEventListener('click', () => {
        dictionarySearch.value = '';
        filterRegion.value = 'all';
        filterPhylum.value = 'all';
        applyDictionaryFilters();
    });

    dictPrevPage.addEventListener('click', () => {
        if (currentDictPage > 1) {
            currentDictPage--;
            renderDictionaryPage();
            mainContent.scrollTop = 0;
        }
    });

    dictNextPage.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredDictionary.length / itemsPerPage);
        if (currentDictPage < totalPages) {
            currentDictPage++;
            renderDictionaryPage();
            mainContent.scrollTop = 0;
        }
    });

    dictionaryGrid.addEventListener('click', (e) => {
        const card = e.target.closest('[data-uid]');
        if (card) {
            showSpeciesModal(card.dataset.uid);
        }
    });

    closeModalBtn.addEventListener('click', () => {
        speciesModal.classList.add('hidden');
    });

    // Contact Information Modal
    const contactInfoModal = document.getElementById('contact-info-modal');
    const closeContactModalBtn = document.getElementById('close-contact-modal-btn');
    const contactOrgBtn = document.getElementById('contact-org-btn');
    const removeNoveltyBtn = document.getElementById('remove-novelty-btn');
    let currentSpeciesData = null;
    
    // Show contact information modal
    contactOrgBtn.addEventListener('click', () => {
        if (!currentSpeciesData) return;
        
        // Mock contact information (in real app, this would come from a database)
        const contactInfo = {
            'CMLRE - ESSO': { email: 'biodiversity@cmlre.gov.in', phone: '+91-832-2525-000', website: 'www.cmlre.gov.in' },
            'NIOT - Chennai': { email: 'research@niot.res.in', phone: '+91-44-2246-0876', website: 'www.niot.res.in' },
            'INCOIS - Hyderabad': { email: 'director@incois.gov.in', phone: '+91-40-2389-5006', website: 'www.incois.gov.in' },
            'ZSI - Kolkata': { email: 'zsi@zsi.gov.in', phone: '+91-33-2286-1948', website: 'www.zsi.gov.in' },
            'CMFRI - Kochi': { email: 'director@cmfri.org.in', phone: '+91-484-239-4867', website: 'www.cmfri.org.in' },
            'FSI - Mumbai': { email: 'fsi@fsi.gov.in', phone: '+91-22-2202-1515', website: 'www.fsi.nic.in' },
            'International Partners': { email: 'global@marine-biodiversity.org', phone: '+1-555-0123', website: 'www.marine-biodiversity.org' }
        };
        
        const orgInfo = contactInfo[currentSpeciesData.organization] || contactInfo['CMLRE - ESSO'];
        
        document.getElementById('contact-org-name').textContent = currentSpeciesData.organization;
        document.getElementById('contact-email').textContent = orgInfo.email;
        document.getElementById('contact-phone').textContent = orgInfo.phone;
        document.getElementById('contact-website').textContent = orgInfo.website;
        document.getElementById('contact-website').href = `https://${orgInfo.website}`;
        document.getElementById('contact-project').textContent = currentSpeciesData.project;
        
        contactInfoModal.classList.remove('hidden');
    });
    
    closeContactModalBtn.addEventListener('click', () => {
        contactInfoModal.classList.add('hidden');
    });
    
    contactInfoModal.addEventListener('click', (e) => {
        if (e.target === contactInfoModal) {
            contactInfoModal.classList.add('hidden');
        }
    });
    
    // Remove from novelty / Add full lineage
    removeNoveltyBtn.addEventListener('click', () => {
        if (!currentSpeciesData) return;
        
        showModal(`Add complete lineage for ${currentSpeciesData.uid}?\n\nThis will remove it from the novelty dictionary and classify it as a known species. You will be prompted to enter the full taxonomic lineage.`, () => {
            // In a real application, this would open a form to input the full lineage
            const lineagePrompt = `Please provide the complete taxonomic lineage:\n\nCurrent: ${currentSpeciesData.taxonomy.phylum} > ${currentSpeciesData.taxonomy.class}\n\nEnter complete lineage (Kingdom > Phylum > Class > Order > Family > Genus > Species):`;
            const lineageInput = prompt(lineagePrompt);
            
            if (lineageInput && lineageInput.trim()) {
                alert(`Lineage updated for ${currentSpeciesData.uid}\n\nNew classification: ${lineageInput}\n\nThis species has been removed from the novelty dictionary and added to the known species database.`);
                speciesModal.classList.add('hidden');
                
                // Remove from dictionary (simulation)
                const index = NOVELTY_DICTIONARY.findIndex(item => item.uid === currentSpeciesData.uid);
                if (index > -1) {
                    NOVELTY_DICTIONARY.splice(index, 1);
                    initializeDictionary(); // Refresh the view
                }
            }
        });
    });

    speciesModal.addEventListener('click', (e) => {
        if (e.target === speciesModal) {
            speciesModal.classList.add('hidden');
        }
    });

    exportDictionaryBtn.addEventListener('click', () => {
        const headers = 'UID,Kingdom,Phylum,Class,Order,Family,Genus,Species,Region,Coordinates,Organization,Project,Abundance,Depth,Habitat,Marker,Confidence,Date,Notes\\n';
        const csv = filteredDictionary.map(item => {
            return `"${item.uid}","${item.taxonomy.kingdom}","${item.taxonomy.phylum}","${item.taxonomy.class}","${item.taxonomy.order}","${item.taxonomy.family}","${item.taxonomy.genus}","${item.taxonomy.species}","${item.region}","${item.coordinates.lat}, ${item.coordinates.lon}","${item.organization}","${item.project}",${item.abundance},${item.depth},"${item.habitat}","${item.marker}",${item.confidence},"${item.date}","${item.notes}"`;
        }).join('\\n');
        
        const blob = new Blob([headers + csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bio-line-novelty-dictionary-${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // --- Chart.js Setup ---
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#9ca3af';

    const createChartConfig = (type, data, options) => ({
        type,
        data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    titleFont: { family: "'Inter', sans-serif" },
                    bodyFont: { family: "'Inter', sans-serif" },
                    padding: 12,
                    cornerRadius: 4,
                    borderColor: '#3f3f46',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) { label += ': '; }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                                if (context.chart.canvas.id === 'accuracyTrendChart') {
                                     label += '%';
                                }
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: '#27272a' }, ticks: { font: { size: 10 } } },
                x: { grid: { color: '#27272a' }, ticks: { font: { size: 10 } } }
            },
            ...options
        }
    });

    // Analysis Volume Chart
    const analysisVolumeChart = new Chart(document.getElementById('analysisVolumeChart'), createChartConfig('line', {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Analyses',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            borderColor: '#ffffff',
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                return gradient;
            },
            tension: 0.4,
            pointBackgroundColor: '#000',
            pointBorderColor: '#fff',
            pointRadius: 4,
            pointHoverRadius: 6,
        }]
    }, { plugins: { legend: { display: true, labels: { boxWidth: 10, font: { size: 10 } } } } }));

    // Accuracy Trend Chart
    const accuracyTrendChart = new Chart(document.getElementById('accuracyTrendChart'), createChartConfig('line', {
        labels: [['v1.0', '(9 Taxa)'], ['v2.0', '(16 Taxa)'], ['v3.0', '(35 Taxa)']],
        datasets: [{ 
            data: [72, 82.6, 93.8], 
            borderColor: '#34d399', 
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
                gradient.addColorStop(0, 'rgba(52, 211, 153, 0.3)');
                gradient.addColorStop(1, 'rgba(52, 211, 153, 0)');
                return gradient;
            },
            pointBackgroundColor: '#000',
            pointBorderColor: '#34d399',
            pointRadius: 5,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 2,
        }]
    }, { scales: { y: { min: 60, max: 100, ticks: { stepSize: 10 } } } }));

    // Confidence Distribution Chart
    const confidenceDistChart = new Chart(document.getElementById('confidenceDistChart'), createChartConfig('bar', {
        labels: ['<90%', '90-95%', '95-98%', '>98%'],
        datasets: [{ 
            data: [12, 19, 52, 128], 
            backgroundColor: 'rgba(96, 165, 250, 0.8)',
            hoverBackgroundColor: 'rgba(147, 197, 253, 1)',
            borderRadius: 4,
        }]
    }));


    // --- WebSocket Simulation for real-time updates ---
    setInterval(() => {
        // Update overview cards
        document.querySelector('#api-status-content p').textContent = `${Math.floor(Math.random() * 5) + 10}ms`;
        const currentUserCount = parseInt(document.querySelector('#active-users-content p').textContent.replace(',', ''));
        document.querySelector('#active-users-content p').textContent = (currentUserCount + Math.floor(Math.random() * 5 - 2)).toLocaleString();
        document.querySelector('#queue-content p').textContent = Math.floor(Math.random() * 2);

        // Update analysis chart
        if(analysisVolumeChart.data.datasets[0].data.length > 20) {
             analysisVolumeChart.data.datasets[0].data.shift();
             analysisVolumeChart.data.labels.shift();
        }
        analysisVolumeChart.data.datasets[0].data.push(Math.floor(Math.random() * 50) + 40);
        analysisVolumeChart.update('none');

    }, 2500);
    
    // --- Initial Load ---
    const initialLoad = () => {
        showSkeletons(true);
        setTimeout(() => {
            renderApprovalList();
            renderUserTable(MOCK_USERS);
            showSkeletons(false);
            document.querySelectorAll('#dashboard-view .reveal').forEach(el => {
                el.classList.add('visible');
            });
        }, 1500);
    };

    initialLoad();

});
