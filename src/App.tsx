import { useMemo, useState } from 'react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Hero } from './components/Hero'
import { CreativeModes } from './components/CreativeModes'
import { ProjectPanel } from './components/ProjectPanel'
import { InspirationGallery } from './components/InspirationGallery'
import { StyleSelectors } from './components/StyleSelectors'
import { FeaturePage } from './components/FeaturePage'
import { PromptStudio } from './components/prompt/PromptStudio'
import { Footer } from './components/Footer'
import { useLocalProject } from './hooks/useLocalProject'
import { useWorkspace } from './hooks/useWorkspace'
import { SavedWorkspace } from './components/workspace/SavedWorkspace'
import { moods } from './data/appData'
import type { NavId, SavedPromptRecord } from './types'

export function App() {
  const [activePage, setActivePage] = useState<NavId>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const { project, updateProject, saveProject, savedAt } = useLocalProject()
  const workspace = useWorkspace()
  const [remixSource, setRemixSource] = useState<SavedPromptRecord | null>(null)

  const prompt = useMemo(() => `${project.name} — ${project.mode} apparel graphic, ${project.size} at ${project.dpi} DPI. ${project.selectedMood} mood with ${project.selectedPalette} palette and ${project.selectedEffect} finish. Luxury fashion-editorial styling created for Black women.`, [project])

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2200)
  }
  const navigate = (page: NavId) => { if (page !== 'remix') setRemixSource(null); setActivePage(page); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const remixSaved = (saved: SavedPromptRecord) => { setRemixSource(saved); setActivePage('remix'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const copyPrompt = async () => {
    try { await navigator.clipboard.writeText(prompt); showToast('Prompt copied to your clipboard.') }
    catch { showToast('Your full prompt is ready in the export file.') }
  }
  const exportPrompt = () => {
    const blob = new Blob([prompt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url; link.download = 'side-eye-flyby-prompt.txt'; link.click(); URL.revokeObjectURL(url)
    showToast('Prompt exported.')
  }
  const surprise = () => {
    const currentIndex = moods.indexOf(project.selectedMood)
    updateProject({ selectedMood: moods[(currentIndex + 1) % moods.length], selectedEffect: project.selectedEffect === 'Gold Glitter' ? 'Gold Foil' : 'Gold Glitter' })
    showToast('A fresh style combination is ready.')
  }
  const creationModes: NavId[] = ['build', 'shake', 'idea', 'remix', 'collection']

  return (
    <div className="app-shell">
      <Sidebar active={activePage} open={menuOpen} project={project} savedCount={workspace.prompts.length} onNavigate={navigate} onClose={() => setMenuOpen(!menuOpen)} onModeChange={(mode) => updateProject({ mode })} onSizeChange={(size) => updateProject({ size })} />
      <div className="app-column">
        <Header onSurprise={surprise} onFavorites={() => navigate('saved')} />
        {activePage === 'home' ? (
          <main className="dashboard">
            <div className="dashboard-main">
              <Hero onStart={() => navigate('build')} />
              <CreativeModes onSelect={navigate} />
              <StyleSelectors project={project} onUpdate={updateProject} />
            </div>
            <aside className="dashboard-rail">
              <ProjectPanel project={project} savedAt={savedAt} onSave={() => { saveProject(); showToast('Project saved locally.') }} onCopy={copyPrompt} onExport={exportPrompt} />
              <InspirationGallery />
            </aside>
          </main>
        ) : activePage === 'saved' ? (
          <SavedWorkspace prompts={workspace.prompts} collections={workspace.collections} onBack={() => navigate('home')} notify={showToast} onRemix={remixSaved} updatePrompt={workspace.updatePrompt} removePrompt={workspace.removePrompt} duplicatePrompt={workspace.duplicatePrompt} updateCollection={workspace.updateCollection} removeCollection={workspace.removeCollection} duplicateCollection={workspace.duplicateCollection} addToCollection={workspace.addToCollection} removeFromCollection={workspace.removeFromCollection} backup={workspace.backup} mergeBackup={workspace.mergeBackup} />
        ) : creationModes.includes(activePage) ? (
          <PromptStudio key={`${activePage}-${remixSource?.id || 'new'}`} mode={activePage as 'build' | 'shake' | 'idea' | 'remix' | 'collection'} production={project.mode} onBack={() => navigate('home')} onModeChange={(mode) => updateProject({ mode })} notify={showToast} initialRemixPrompt={remixSource?.prompt} onSavePrompt={workspace.saveBuiltPrompt} onSaveCollection={workspace.saveCollection} />
        ) : <FeaturePage page={activePage} onBack={() => navigate('home')} />}
        <Footer />
      </div>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}
