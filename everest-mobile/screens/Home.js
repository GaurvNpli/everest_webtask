import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function Home({ navigation }) {
  const features = [
    { icon: 'calendar-outline', title: 'Calendar', desc: 'Pick any date', screen: 'Calendar' },
    { icon: 'calculator-outline', title: 'Calculator', desc: 'Quick calculations', screen: 'Calculator' },
    { icon: 'time-outline', title: 'Server Time', desc: 'Live server clock', screen: 'Server Time' },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Everest.</Text>
      <Text style={styles.tagline}>Assignment By Gaurav Nepali</Text>

      <View style={styles.cards}>
        {features.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.7}
          >
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={20} color="#0f172a" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -1,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 48,
  },
  cards: {
    width: '100%',
    gap: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  cardDesc: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
}) 
